<template>
  <div class="main-content">
    <h2 class="page-title">Lista de Presença</h2>
    <div class="search-container">
      <form class="filter-form" @submit.prevent="getAttendance">
        <div class="form-group">
          <label for="workshop">Oficina</label>
          <select id="workshop" v-model="workshopId" @change="listClasses">
            <option disabled value="">Selecione uma oficina</option>
            <option
              v-for="workshop in workshops"
              :key="workshop.id"
              :value="workshop.id"
            >
              {{ workshop.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="classes">Aulas</label>
          <select id="classes" v-model="selectedDate">
            <option disabled value="">Selecione uma aula</option>
            <option
              v-for="scheduledDate in classes"
              :key="scheduledDate"
              :value="scheduledDate"
            >
              {{ formatDateOnly(scheduledDate) }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-filtrar" :disabled="loading">
          {{ loading ? "Carregando..." : "Listar" }}
        </button>
      </form>
    </div>

    <div v-if="students.length" class="content-box">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Estudante</th>
            <th>ID do Estudante</th>
            <th>Presença</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.studentId">
            <td>{{ index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.studentId }}</td>
            <td>
              <select v-model="student.present">
                <option disabled value="">Selecione</option>
                <option :value="true">Presente</option>
                <option :value="false">Ausente</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button class="btn-enviar" @click="sendAttendance">
        Enviar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";

const workshops = ref([]);
const workshopId = ref("");
const classes = ref([]);
const selectedDate = ref("");
const students = ref([]);
const loading = ref(false);
const searched = ref(false);

watch(workshopId, (newVal) => {
  if (!newVal) {
    classes.value = [];
    selectedDate.value = "";
    students.value = [];
    searched.value = false;
  } else {
    selectedDate.value = "";
    students.value = [];
    searched.value = false;
  }
});

const toast = useToast();

const listWorkshops = async () => {
  try {
    const response = await api.get("/workshops");
    workshops.value = response.data;
  } catch (error) {
    toast.error("Erro ao buscar oficinas.");
    console.error(error);
  }
};

const listClasses = async () => {
  if (!workshopId.value) {
    classes.value = [];
    return;
  }

  classes.value = [];
  students.value = [];

  try {
    const response = await api.get(`/workshops/${workshopId.value}/classes`);
    const scheduledDates = response.data.map((item) => item.scheduledDate);

    const nextClassResponse = await api.get(`/workshops/${workshopId.value}/next-class-date`);
    const nextClassDate = nextClassResponse.data?.nextClassDate;

    classes.value = [...scheduledDates];

    const existingNextClass = response.data.find(
      c => formatDateOnly(c.scheduledDate) === formatDateOnly(nextClassDate)
    );

    if (!existingNextClass) {
      classes.value.push(nextClassDate);
    }

  } catch (error) {
    toast.error("Erro ao buscar aulas.");
    console.error(error);
  }
};

const getAttendance = async () => {
  if (!selectedDate.value || !workshopId.value) {
    toast.warning("Por favor, selecione uma oficina e uma aula.");
    return;
  }

  loading.value = true;
  searched.value = false;

  try {
    const response = await api.get(
      `/workshops/${workshopId.value}/attendances/by-date`,
      {
        params: { date: formatDateOnly(selectedDate.value) },
      }
    );

    if (response.data.length > 0) {
      students.value = response.data.map((item) => ({
        attendanceId: item.attendanceId,
        studentId: item.studentId,
        name: item.name,
        present: item.present ?? "",
      }));
    } else {
      const alunosResponse = await api.get(`/workshops/${workshopId.value}/students`);
      students.value = alunosResponse.data.map((aluno) => ({
        studentId: aluno.id,
        name: aluno.name,
        present: "",
      }));

      toast.info("Nenhuma presença registrada ainda. Preencha os dados para criar.");
    }

    searched.value = true;
  } catch (error) {
    toast.error("Erro ao buscar alunos. Tente novamente.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const sendAttendance = async () => {
  const invalidos = students.value.filter(
    (s) => s.present === "" || s.present === null
  );
  if (invalidos.length > 0) {
    toast.warning("Marque a presença de todos os alunos antes de enviar.");
    return;
  }

  loading.value = true;

  try {
    const existingClassRes = await api.get(`/workshops/${workshopId.value}/classes`);
    const existingClass = existingClassRes.data.find(
      c => formatDateOnly(c.scheduledDate) === formatDateOnly(selectedDate.value)
    );

    let classId;

    if (existingClass) {
      classId = existingClass.id;
    } else {
      const newClassRes = await api.post('/classes', {
        scheduledDate: formatDateOnly(selectedDate.value),
        workshopId: workshopId.value,
      });
      classId = newClassRes.data.id;
    }

    const promises = students.value.map((s) => {
      if (s.attendanceId) {
        return api.put(`/attendances/${s.attendanceId}`, {
          present: s.present,
        });
      } else {
        return api.post(`/attendances`, {
          studentId: s.studentId,
          classId,
          present: s.present,
        });
      }
    });

    await Promise.all(promises);

    toast.success("Presenças atualizadas com sucesso!");
  } catch (error) {
    toast.error("Erro ao enviar presenças.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

function formatDateOnly(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

onMounted(() => {
  listWorkshops();
});
</script>

<style scoped src="../assets/presenca.css"></style>
