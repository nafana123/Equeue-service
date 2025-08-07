<style src="@/assets/styles/modal/ticketModal.css"></style>

<template>
  <div class="custom-modal-backdrop" :class="{ show: show }" @click.self="close">
    <div class="custom-modal-dialog">
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <h5 class="custom-modal-title">Создание талона для получения спецодежды</h5>
          <span class="modal-subtitle">(согласно установленным срокам получения)</span>
          <button type="button" class="custom-btn-close" @click="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="custom-modal-body">
          <!-- Вкладки -->
          <div class="tabs">
            <button class="tab" :class="{ active: activeTab === 'date' }" @click="activeTab = 'date'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5M16 2V5M3 9H21M5 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Дата
            </button>
            <button class="tab" :class="{ active: activeTab === 'time' }" @click="activeTab = 'time'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Время
            </button>
          </div>

          <!-- Выбор даты -->
          <div class="date-picker" v-show="activeTab === 'date'">
            <div class="calendar-header">
              <button class="nav-button" @click="prevMonth">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div class="month-year">{{ currentMonthName }} {{ currentYear }}</div>
              <button class="nav-button" @click="nextMonth">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            
            <div class="week-days">
              <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day" class="week-day">{{ day }}</div>
            </div>
            
            <div class="calendar-days">
              <div v-for="day in calendarDays" :key="day.date" 
                   class="calendar-day" 
                   :class="{ 
                     'other-month': !day.isCurrentMonth,
                     'selected': day.isSelected,
                     'today': day.isToday
                   }"
                   @click="selectDate(day)">
                {{ day.day }}
                <span class="day-dot" v-if="day.hasAvailableTime"></span>
              </div>
            </div>
          </div>

          <!-- Выбор времени -->
          <div class="time-picker" v-show="activeTab === 'time'">
            <div class="time-slots">
              <div v-for="time in filteredTimeOptions" 
                   :key="time" 
                   class="time-slot"
                   :class="{ 'selected': selectedTime === time }"
                   @click="selectTime(time)">
                {{ time }}
              </div>
            </div>
          </div>
        </div>
        <div class="custom-modal-footer">
          <div class="selected-info" v-if="selectedDate || selectedTime">
            <span v-if="selectedDate">Выбрана дата: <strong>{{ formattedSelectedDate }}</strong></span>
            <span v-if="selectedTime"> | Время: <strong>{{ selectedTime }}</strong></span>
          </div>
          <div class="footer-buttons">
            <button type="button" class="custom-btn custom-btn-secondary" @click="close">Отмена</button>
            <button type="button" class="custom-btn custom-btn-primary" @click="submit" :disabled="!selectedDate || !selectedTime">
              Подтвердить
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    timeOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    // Получаем локальную дату без времени
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Форматируем дату как YYYY-MM-DD в локальном времени
    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      activeTab: 'date',
      selectedDate: formatLocalDate(today),
      selectedTime: '',
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      today: formatLocalDate(today)
    };
  },
  computed: {
    currentMonthName() {
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      return months[this.currentMonth];
    },
    formattedSelectedDate() {
      if (!this.selectedDate) return '';
      const [year, month, day] = this.selectedDate.split('-');
      return `${day}.${month}.${year}`;
    },
    calendarDays() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
      
      // Начинаем с понедельника
      const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
      const daysInMonth = lastDayOfMonth.getDate();
      
      const formatLocalDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      const days = [];
      
      // Добавляем дни предыдущего месяца
      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
      for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const dateObj = new Date(this.currentYear, this.currentMonth - 1, day);
        const date = formatLocalDate(dateObj);
        days.push({
          day,
          date,
          isCurrentMonth: false,
          isSelected: date === this.selectedDate,
          isToday: date === this.today,
          hasAvailableTime: this.hasAvailableTimeSlots(date)
        });
      }
      
      // Добавляем дни текущего месяца
      for (let i = 1; i <= daysInMonth; i++) {
        const dateObj = new Date(this.currentYear, this.currentMonth, i);
        const date = formatLocalDate(dateObj);
        days.push({
          day: i,
          date,
          isCurrentMonth: true,
          isSelected: date === this.selectedDate,
          isToday: date === this.today,
          hasAvailableTime: this.hasAvailableTimeSlots(date)
        });
      }
      
      // Добавляем дни следующего месяца
      const daysToAdd = 42 - days.length;
      for (let i = 1; i <= daysToAdd; i++) {
        const dateObj = new Date(this.currentYear, this.currentMonth + 1, i);
        const date = formatLocalDate(dateObj);
        days.push({
          day: i,
          date,
          isCurrentMonth: false,
          isSelected: date === this.selectedDate,
          isToday: date === this.today,
          hasAvailableTime: this.hasAvailableTimeSlots(date)
        });
      }
      
      return days;
    },
    filteredTimeOptions() {
      return this.timeOptions;
    }
  },
  methods: {
    hasAvailableTimeSlots(date) {
      // Всегда возвращаем true, чтобы можно было выбрать любую дату
      return true;
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    selectDate(day) {
      this.selectedDate = day.date;
      this.activeTab = 'time';
    },
    selectTime(time) {
      this.selectedTime = time;
    },
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit', { date: this.selectedDate, time: this.selectedTime });
      this.close();
    }
  }
};
</script>