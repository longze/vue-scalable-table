/**
 * @file 组件示例
 *
 * @author zhaoxiaoqiang
 * @date 2017/4/12
 */
import Vue from 'vue/dist/vue.common.js';
import VueResource from 'vue-resource';

import tableComponent from '../src/index.vue';
import vstTextMap from '../src/vst-plugin/text-map';
import vstTimeFormat from '../src/vst-plugin/time-format';
import 'element-ui/lib/theme-default/checkbox.css';
import ElPagination from 'element-ui/lib/pagination';
import 'element-ui/lib/theme-default/pagination.css';
import 'element-ui/lib/theme-default/index.css';

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        tableOptions: {
            firstRow: {
                width: '50px', // 30px  50px
                type: 'checkbox',  // 'number' 'checkbox'
                title: '序号',      // 序号 选择 全选

                // 下面配置 只有 type 为 'checkbox' 时生效
                hasSelectAll: true, // 是否有全选功能，为 true 时，title 被重置为"全选"，缺省值为 true
                canSwitchSelectInvertion: true, // 是否能反选切换，全部未选中时为全选，有选中项时为反选，缺省值为 true
                maxChecked: 1       // 最多选中几个，不设置无限多
            },
            selectedItems: [1, 4],       // 选中项数组，可以是主键的数组，也可以是选中对象的数组
            // 主键的数组的两种数据类型：
            // [1, 2] 或 ['1', '2']
            // 选中对象的数组：
            // [{id: 1, name: ''}, {id: 2, name: ''}]
            headers: [
                {
                    title: '姓名',        // 表格标题
                    field: 'name',        // 字段名，prop
                    // width: '50%',         // 宽度同时支持百分比和像素配置
                    styleClass: ['a-class']
                },
                {
                    title: '年龄',
                    field: 'age',
                    width: '180px'
                },
                {
                    title: '心情',
                    field: 'mood',
                    width: '180px',
                    slot: 'text-map',
                    // 为某个插件准备的数据，可以是业务数据
                    moodMap: [
                        {
                            value: 1,
                            text: '平静'
                        },
                        {
                            value: 2,
                            text: '激动'
                        }
                    ]
                },
                {
                    title: '时间',
                    field: 'time',
                    width: '180px',
                    slot: 'time-format'
                }
            ],
            // 静态数据
            data: [
                {
                    id: 1,
                    name: 'tom',
                    age: 3,
                    mood: 1
                },
                {
                    id: 2,
                    name: 'jerry',
                    age: 1,
                    mood: 2,
                    time: 1492666945092
                }
            ],

            /**
             * 返回的数据可能是一个复杂结构，可以自定义获取数据的方法，也可以做一些数据加工
             *
             * @param {Object} res 返回的数据，组件默认使用 vue-resource 加载异步数据
             */
            afterGetData(res) {
                // 默认会在后台返回的数据上加一层 body ，当然你可以全局设置去掉 body
                // 改变 res 数据结构适应组件要求
            },
            // url: '/users',
            params: {
                name: '固定参数，和搜索条件与页码无关，会覆盖搜索参数'
            },
            // 页码的配置，不配置此项时不显示页码
            pageConfig: {
                currentPageField: 'currentPage',
                dataTotalField: 'total',
                pageSizeField: 'pageSize',
                pageSize: 10
            }
        },
        text: 'abc'

    },
    components: {
        'table-component': tableComponent,
        'vst-text-map': vstTextMap,
        'vst-time-format': vstTimeFormat,
        'el-pagination': ElPagination
    },
    methods: {

        /**
         * 模拟表单的查询条件
         */
        search() {
            this.$refs.table.search({
                a: 'a',
                b: 'b'
            });
        },

        /**
         * 获取选中项的示例
         */
        getSelected() {
            // 结果
            console.log(this.$refs.table.getSelectedItems());
            console.log(this.$refs.table.getSelectedItemsMainField());
        }
    }
});