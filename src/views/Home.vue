<template>
  <div class="home">

    <van-tabs>
      <van-tab title="标签1">
        <van-pull-refresh v-model="list[0].refreshing" @refresh="onRefresh(0)">
          <van-list v-model="list[0].loading" :finished="list[0].finished" finished-text="我是完成文案" @load="onLoad(0)">
            <van-cell v-for="item in list[0].items" :key="item" :title="item"></van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="出错啦">
        <van-pull-refresh v-model="list[1].refreshing" @refresh="onRefresh(1)">
          <van-list
                  v-model="list[1].loading"
                  :finished="list[1].finished"
                  :error.sync="list[1].error"
                  error-text="我是出错文案"
                  @load="onLoad(1)"
          >
            <van-cell
                    v-for="item in list[1].items"
                    :key="item"
                    :title="item"></van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List,PullRefresh,Cell,Image , DropdownMenu, DropdownItem  } from 'vant';
export default {
  name: 'Home',
  data(){
    return {
      active:2,
      dataList:[],
      list: [
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false
        }
      ]
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    [Image.name]: Image,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  methods:{
    onLoad(index) {
      const list = this.list[index];
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = list.items.length + 1;
          list.items.push(text < 10 ? '0' + text : text);
        }
        list.loading = false;

        // show error info in second demo
        list.error = index === 1 && list.items.length === 10 && !list.error;
        if (list.items.length >= 40) {
          list.finished = true;
        }
      }, 500);
    },

    onRefresh(index) {
      const list = this.list[index];
      setTimeout(() => {
        list.items = [];
        list.error = false;
        list.finished = false;
        list.refreshing = false;
        window.scrollTo(0, 10);
      }, 2000);
    }
  }
}
</script>
