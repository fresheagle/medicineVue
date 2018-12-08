<template>
  <div :class="className" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['私立', '公立']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }],
        yAxis: [
          {
            type: 'value',
            name: '医疗机构数量',
            min: 0,
            max: 14000,
            interval: 2000,
            axisLabel: {
              formatter: '{value}'
            }
          }
          ],
        series: [
          {
            name: '私立',
            type: 'bar',
            data: [210, 490, 700, 2132, 2560, 1762, 1564, 5734, 3252, 2452, 6452, 3453]
          },
          {
            name: '公立',
            type: 'bar',
            data: [245, 592, 900, 2645, 2837, 2707, 1756, 1822, 487, 188, 4520, 4563]
          }]
      })
    }
  }
}
</script>
