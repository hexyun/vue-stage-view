
<template>
  <stage-view
    v-ref:stage_view
    :list="list"
    key-thumb="url"
    key-detail="url"
    :keyword="keyword"
    key-title="title"
    :scale="zoom"
  ></stage-view>
</template>
<script>
function mockData() {
  const urls = [
    "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819109401,2573286501&fm=26&gp=0.jpg",
    "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=80274084,2988281088&fm=26&gp=0.jpg",
    "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=520772347,1639860623&fm=11&gp=0.jpg",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=968897864,3213190193&fm=26&gp=0.jpg",
    "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3560174241,1441889743&fm=26&gp=0.jpg," +
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2289902233,4012915850&fm=26&gp=0.jpg"
  ];
  let i = 0,
    list = [];
  while (i < 30) {
    list.push({
      title: `${i + 1}猫咪`,
      url: urls[parseInt(Math.random() * 5)]
    });
    i++;
  }

  return list;
}
export default {
  data() {
    return {
      list: mockData(),
      keyword: "",
      zoom: 60
    };
  },
  ready() {
    setTimeout(() => (this.keyword = "1"), 1000);
    // setTimeout(() => this.remove('title'), 5000);
  },
  methods: {
    remove(key) {
      const cur = this.$refs.stage_view.currentItem;
      let index = -1;
      if (cur && cur[key]) {
        index = this.list.findIndex(x => x[key] == cur[key]);
      }
      if (index > -1) {
        this.list.splice(index, 1);
      }
      this.$refs.stage_view.selectShow = false
      this.$refs.list.currentIndex = -1
    }
  }
};
</script>
