<template>
  <div class="main-content">
    <h2 class="page-title">Lista de Presença</h2>
    <div class="content-box">
      <form class="filter-form" @submit.prevent>
        <div class="form-group">
          <label for="oficina">Oficina</label>
          <select id="oficina" v-model="oficina">
            <option value="Logica Prog">Lógica Prog</option>
          </select>
        </div>
        <div class="form-group">
          <label for="data">Date</label>
          <input id="data" type="date" v-model="data" />
        </div>
        <button type="submit" class="btn-filtrar">Listar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaPresenca',
  data() {
    return {
      oficina: 'Logica Prog',
      data: '',
    };
  },
};
</script>

<style scoped src="../assets/presenca.css"></style>