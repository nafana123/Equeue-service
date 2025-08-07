<template>
    <div class="table-container">
      <div class="table-header-modern">
        <h2>Информация по очереди</h2>
        <div class="table-actions">
          <div class="ticket-btn-group">
            <button class="ticket-btn" @click="$emit('create-ticket-by-date')">
              <span class="ticket-btn-main">Создать талон</span>
              <span class="ticket-btn-sub">(согласно сроку получения)</span>
            </button>
            <button class="ticket-btn" @click="$emit('create-ticket-by-act')">
              <span class="ticket-btn-main">Создать талон</span>
              <span class="ticket-btn-sub">(по акту списания)</span>
            </button>
            <button class="ticket-btn" @click="$emit('create-ticket-by-norm')">
              <span class="ticket-btn-main">Создать талон</span>
              <span class="ticket-btn-sub">(дополнение к норме)</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="table-scroll">
        <table class="modern-table">
          <thead>
            <tr>
              <th 
                v-for="column in columns" 
                :key="column.key" 
                @click="$emit('sort-table', column.key)" 
                :class="{ active: sortColumn === column.key }"
              >
                <div class="th-content">
                  {{ column.label }}
                  <span v-if="sortColumn === column.key" class="sort-icon">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedData" :key="item.id">
              <td>
                <div class="user-cell">
                  <div class="user-avatar small">{{ getInitials(item.fullName) }}</div>
                  <div>
                    <p class="user-name">{{ item.fullName }}</p>
                    <p class="user-email">{{ item.email }}</p>
                  </div>
                </div>
              </td>
              <td>{{ item.position }}</td>
              <td>
                <span class="department-badge" :style="{ backgroundColor: getDeptColor(item.department) }">
                  {{ item.department }}
                </span>
              </td>
              <td>{{ item.phone }}</td>
              <td>
                <span class="status-badge" :class="item.status.toLowerCase()">
                  {{ item.status }}
                </span>
              </td>
              <td>
                <button class="action-btn" @click="$emit('row-action', item)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="table-footer-modern">
        <div class="pagination-info">
          Показано {{ paginatedData.length }} из {{ filteredData.length }} записей
        </div>
        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1" 
            @click="$emit('prev-page')"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="page-numbers">
            <span 
              v-for="page in visiblePages" 
              :key="page" 
              @click="$emit('go-to-page', page)" 
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </span>
          </div>
          <button 
            class="pagination-btn" 
            :disabled="currentPage >= totalPages" 
            @click="$emit('next-page')"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModernTable',
    props: {
      columns: {
        type: Array,
        required: true,
        default: () => []
      },
      filteredData: {
        type: Array,
        required: true,
        default: () => []
      },
      sortColumn: {
        type: String,
        default: 'fullName'
      },
      sortDirection: {
        type: String,
        default: 'asc'
      },
      currentPage: {
        type: Number,
        default: 1
      },
      itemsPerPage: {
        type: Number,
        default: 8
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
      },
      visiblePages() {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.totalPages, start + maxVisible - 1);
        
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        return pages;
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredData.slice(start, end);
      }
    },
    methods: {
      getInitials(fullName) {
        return fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();
      },
      getDeptColor(department) {
        const colors = {
          'IT': '#6366f1',
          'Маркетинг': '#10b981',
          'Финансы': '#f59e0b',
          'HR': '#ec4899',
          'Продажи': '#3b82f6',
          'Разработка': '#8b5cf6'
        };
        return colors[department] || '#6b7280';
      }
    }
  }
  </script>
