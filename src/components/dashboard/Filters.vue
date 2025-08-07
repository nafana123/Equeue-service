<template>
  <div class="filter-strip">
    <div class="filter-group modern">
      <label>Отдел</label>
      <div class="select-wrapper">
        <select v-model="filters.department" class="modern-select">
          <option value="">Все отделы</option>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
        <div class="select-arrow"></div>
      </div>
    </div>
    
    <div class="filter-group modern">
      <label>Статус</label>
      <div class="select-wrapper">
        <select v-model="filters.status" class="modern-select">
          <option value="">Все статусы</option>
          <option v-for="stat in statuses" :key="stat" :value="stat">{{ stat }}</option>
        </select>
        <div class="select-arrow"></div>
      </div>
    </div>
    
    <div class="filter-group modern">
      <label>Дата</label>
      <div class="select-wrapper">
        <select v-model="filters.dateRange" class="modern-select">
          <option value="all">За все время</option>
          <option value="today">Сегодня</option>
          <option value="week">Эта неделя</option>
          <option value="month">Этот месяц</option>
        </select>
        <div class="select-arrow"></div>
      </div>
    </div>
    
    <button class="modern-btn reset-btn" @click="resetFilters">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H16V6C16 5.46957 16.2107 4.96086 16.5858 4.58579C16.9609 4.21071 17.4696 4 18 4H20M20 4V6M20 4V2M9 19H20V17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Сбросить
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      required: true
    },
    departments: {
      type: Array,
      required: true
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  methods: {
    resetFilters() {
      this.$emit('reset-filters');
    },
    updateFilter(filterName, value) {
      this.$emit('update:filters', { ...this.filters, [filterName]: value });
    }
  }
};
</script>