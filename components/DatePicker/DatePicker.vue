<template>
  <view class="calendar">
    <!-- 头部：月份和左右切换按钮 -->
    <view class="calendar-header">
      <button @click="prevMonth" class="calendar-nav-button" :disabled="isPrevDisabled">
				<uni-icons type="left"></uni-icons>
			</button>
      <text>{{ year }}年 {{ month + 1 }}月</text>
      <button @click="nextMonth" class="calendar-nav-button" :disabled="isNextDisabled">
				<uni-icons type="right"></uni-icons>
			</button>
    </view>

    <!-- 星期标题 -->
    <view class="calendar-weekdays">
      <text v-for="(day, index) in weekDays" :key="index">{{ day }}</text>
    </view>

    <!-- 日期展示 -->
    <view class="calendar-dates">
      <view v-for="(day, index) in monthDays" :key="index" class="calendar-day"
        :class="{
          'calendar-day-selected': isSelected(day),
          'calendar-day-range': isInRange(day),
          'calendar-day-disabled': isDisabled(day),
          'calendar-day-start': isStart(day),
          'calendar-day-end': isEnd(day)
        }"
        @click="selectDate(day)">
        <text v-if="day">{{ day.getDate() }}</text>
      </view>
			
    </view>
		<view class="tail">
			<view class="clear" @click="resetToCurrent">清除日期</view>
			<view class="total-days">共休息<text class="total">{{ totalDays || '?' }}</text>晚</view>
		</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useOrderStore } from '../../store/orderStore';

// 获取当前日期
const today = new Date();
const startDate = ref(null);
const endDate = ref(null);
const currentDate = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const twoYearsLater = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate());

// -----------------------------耦合部分-----------------------------
const orderStore = useOrderStore()

const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

const year = computed(() => currentDate.value.getFullYear());
const month = computed(() => currentDate.value.getMonth());
const totalDays = computed(() => {
  if (!startDate.value || !endDate.value) return '?';
  const timeDiff = endDate.value.getTime() - startDate.value.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff;
});
// 获取当月的第一天和最后一天
const firstDayOfMonth = computed(() => new Date(year.value, month.value, 1));
const lastDayOfMonth = computed(() => new Date(year.value, month.value + 1, 0));

// 计算日历数据，只显示当月的日期
const monthDays = computed(() => {
  let dates = [];
  let firstDay = firstDayOfMonth.value;
  let lastDay = lastDayOfMonth.value;

  // 获取第一天的星期索引（0: 周日, 1: 周一, ..., 6: 周六）
  let firstWeekday = firstDay.getDay();
  firstWeekday = firstWeekday === 0 ? 7 : firstWeekday; // 让周日变成 7，确保排列从周一开始

  // 填充前面的空白
  for (let i = 1; i < firstWeekday; i++) {
    dates.push(null);
  }

  // 填充当月日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year.value, month.value, i));
  }

  return dates;
});

// 判断是否选中
const isSelected = (date) => date && startDate.value && startDate.value.toDateString() === date.toDateString();

// 判断是否在选中范围内
const isInRange = (date) => date && startDate.value && endDate.value && date > startDate.value && date < endDate.value;

// 判断是否是开始或结束
const isStart = (date) => date && startDate.value && startDate.value.toDateString() === date.toDateString();
const isEnd = (date) => date && endDate.value && endDate.value.toDateString() === date.toDateString();

// 判断是否禁用
const isDisabled = (date) => !date || date < today || date > twoYearsLater;

// 选择日期
const selectDate = (date) => {
  if (!date || isDisabled(date)) return;
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date;
    endDate.value = null;
  } else {
    if (date > startDate.value) {
      endDate.value = date;
    } else if(date < startDate.value) {
      endDate.value = startDate.value;
      startDate.value = date;
    }
  }
	// ------------------------------------耦合部分-------------------------------------------------
	orderStore.setTime(startDate.value, endDate.value, totalDays.value)
};

// 上个月
const prevMonth = () => {
  let prev = new Date(year.value, month.value - 1, 1);
  let minDate = new Date(today.getFullYear(), today.getMonth(), 1); // 当前月的 1 号
  if (prev >= minDate) {
    currentDate.value = prev;
  }
};

// 下个月
const nextMonth = () => {
  let next = new Date(year.value, month.value + 1, 1);
  if (next <= twoYearsLater) {
    currentDate.value = next;
  }
};

// 返回当前月份
const resetToCurrent = () => {
	startDate.value = null;
	endDate.value = null;
  currentDate.value = new Date(today.getFullYear(), today.getMonth(), 1);
};

// 是否禁用上一月/下一月按钮
const isPrevDisabled = computed(() => {
  let minDate = new Date(today.getFullYear(), today.getMonth(), 1); // 当前月的 1 号
  return currentDate.value <= minDate; // 只在当前月才禁用
});
const isNextDisabled = computed(() => new Date(year.value, month.value + 1, 1) > twoYearsLater);
</script>

<style lang="scss" scoped>
.calendar {
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: #fcf8ee;
	font-family: '本墨绪圆';
	
	.tail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
		font-size: 28rpx;
		.clear {
			cursor: pointer;
			&:active {
				color: red;
			}
		}
		.total-days {
			.total {
				font-size: 35rpx;
				font-weight: 600;
				color: #8c8172;
			}
		}
	}
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
	font-size: 36rpx;
	font-weight: 600;
	color: #c5b6a0;
  .calendar-nav-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:disabled {
      color: #dddddd;
      cursor: not-allowed;
    }
		&:after {
			border: none;
		}
  }

}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
	font-size: 24rpx;
}

.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
	font-size: 20rpx;
}

.calendar-day {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;

  &-selected {
    background-color: #c5b6a0;
    color: white;
  }

  &-range {
    background-color: #d9cfaa;
  }

  &-start,
  &-end {
    background-color: #c5b6a0;
    color: white;
  }

  &-disabled {
    color: #ccc;
    cursor: not-allowed;
  }
}
</style>
