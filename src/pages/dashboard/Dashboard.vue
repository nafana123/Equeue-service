<template>
  <div class="dashboard-container">
    <Header :userInfo="userInfo" />
    
    <main class="content-wrapper">
      <FilterStrip 
        :filters="filters"
        :departments="departments"
        :statuses="statuses"
        @reset-filters="resetFilters"
        @update:filters="updateFilters"
      />
      
      <ModernTable
        :columns="columns"
        :filtered-data="filteredData"
        :sort-column="sortColumn"
        :sort-direction="sortDirection"
        :current-page="currentPage"
        @sort-table="sortTable"
        @create-ticket-by-date="createTicketByDate"
        @create-ticket-by-act="createTicketByAct"
        @create-ticket-by-norm="createTicketByNorm"
        @prev-page="prevPage"
        @next-page="nextPage"
        @go-to-page="goToPage"
        @row-action="handleRowAction"
      />
    </main>
    
    <TicketModal
      :show="showTicketModal"
      :dateOptions="ticketDateOptions"
      :timeOptions="ticketTimeOptions"
      @close="handleTicketModalClose"
      @submit="handleTicketModalSubmit"
    />
  </div>
</template>

<script>
import TicketModal from '@/components/dashboard/modal/TicketModal.vue';
import Header from '@/components/Header.vue';
import FilterStrip from '@/components/dashboard/Filters.vue';
import ModernTable from '@/components/dashboard/Table.vue';

export default {
  name: 'ModernDashboard',
  components: { 
    TicketModal, 
    Header, 
    FilterStrip,
    ModernTable
  },
  data() {
    return {
      userInfo: {
        fullName: 'Иванов Иван Иванович',
        position: 'Менеджер проектов',
        personalId: 'EMP-00742',
      },
      filters: {
        department: '',
        status: '',
        dateRange: 'all'
      },
      departments: ['IT', 'Маркетинг', 'Финансы', 'HR', 'Продажи', 'Разработка'],
      statuses: ['Активен', 'В отпуске', 'На больничном', 'Уволен', 'Удалён'],
      sortColumn: 'fullName',
      sortDirection: 'asc',
      currentPage: 1,
      itemsPerPage: 8,
      columns: [
        { key: 'fullName', label: 'Сотрудник' },
        { key: 'position', label: 'Должность' },
        { key: 'department', label: 'Отдел' },
        { key: 'phone', label: 'Телефон' },
        { key: 'status', label: 'Статус' },
        { key: 'actions', label: '' }
      ],
      tableData: [
          {
            id: 1,
            fullName: 'Петров Алексей Сергеевич',
            position: 'Frontend разработчик',
            department: 'IT',
            email: 'a.petrov@company.com',
            phone: '+7 (912) 345-67-89',
            status: 'Активен'
          },
          {
            id: 2,
            fullName: 'Смирнова Анна Владимировна',
            position: 'Маркетолог',
            department: 'Маркетинг',
            email: 'a.smirnova@company.com',
            phone: '+7 (923) 456-78-90',
            status: 'В отпуске'
          },
          {
            id: 3,
            fullName: 'Козлов Дмитрий Иванович',
            position: 'Финансовый аналитик',
            department: 'Финансы',
            email: 'd.kozlov@company.com',
            phone: '+7 (934) 567-89-01',
            status: 'Активен'
          },
          {
            id: 4,
            fullName: 'Новикова Елена Петровна',
            position: 'HR-менеджер',
            department: 'HR',
            email: 'e.novikova@company.com',
            phone: '+7 (945) 678-90-12',
            status: 'На больничном'
          },
          {
            id: 5,
            fullName: 'Волков Михаил Александрович',
            position: 'Менеджер по продажам',
            department: 'Продажи',
            email: 'm.volkov@company.com',
            phone: '+7 (956) 789-01-23',
            status: 'Активен'
          },
          {
            id: 6,
            fullName: 'Павлова Ольга Сергеевна',
            position: 'Backend разработчик',
            department: 'Разработка',
            email: 'o.pavlova@company.com',
            phone: '+7 (967) 890-12-34',
            status: 'Активен'
          },
          {
            id: 7,
            fullName: 'Соколов Артём Викторович',
            position: 'Дизайнер',
            department: 'Маркетинг',
            email: 'a.sokolov@company.com',
            phone: '+7 (978) 901-23-45',
            status: 'Уволен'
          },
          {
            id: 8,
            fullName: 'Лебедева Наталья Дмитриевна',
            position: 'Бухгалтер',
            department: 'Финансы',
            email: 'n.lebedeva@company.com',
            phone: '+7 (989) 012-34-56',
            status: 'Активен'
          },
          {
            id: 9,
            fullName: 'Егоров Сергей Петрович',
            position: 'Тестировщик',
            department: 'IT',
            email: 's.egorov@company.com',
            phone: '+7 (990) 123-45-67',
            status: 'Активен'
          },
          {
            id: 10,
            fullName: 'Морозова Ирина Алексеевна',
            position: 'SMM-менеджер',
            department: 'Маркетинг',
            email: 'i.morozova@company.com',
            phone: '+7 (901) 234-56-78',
            status: 'Удалён'
          }
        ],
        showTicketModal: false,
        ticketTimeOptions: [
          '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'
        ],
      showTicketModal: false,
      ticketTimeOptions: [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'
      ]
    }
  },
  computed: {
    filteredData() {
      let result = [...this.tableData];
      
      if (this.filters.department) {
        result = result.filter(item => item.department === this.filters.department);
      }
      
      if (this.filters.status) {
        result = result.filter(item => item.status === this.filters.status);
      }
      
      result.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      
      return result;
    }
  },
  methods: {
    createTicketByDate() {
      this.showTicketModal = true;
    },
    createTicketByAct() {
      console.log('Создать талон (по акту списания)');
    },
    createTicketByNorm() {
      console.log('Создать талон (дополнение к норме)');
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
    resetFilters() {
      this.filters = {
        department: '',
        status: '',
        dateRange: 'all'
      };
      this.currentPage = 1;
    },
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.filteredData.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    handleTicketModalClose() {
      this.showTicketModal = false;
    },
    handleTicketModalSubmit(payload) {
      console.log('Создан талон:', payload);
      this.showTicketModal = false;
    },
    handleRowAction(item) {
      console.log('Действие для строки:', item);
    }
  }
}
</script>

<style src="@/assets/styles/dashboard/dashboard.css"></style>