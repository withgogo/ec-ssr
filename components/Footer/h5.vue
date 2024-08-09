<template>

    <div class="flex align-items-center flex-wrap  just-between servce-four h5-content-p">
        <div class="servce-four-one flex align-items-center">
            <el-image src="/img/home/transport.png" class="servce-four-one-icon"></el-image>
            <span class="servce-four-one-text">
              <!-- 全站滿1500免運 -->
               {{$t('foot.val1')}}
            </span>
        </div>
        <div class="servce-four-one flex align-items-center">
            <el-image src="/img/home/zan.png" class="servce-four-one-icon"></el-image>
            <span class="servce-four-one-text">
              <!-- 醫師,藥師,營養師 產品把關 -->
               {{$t('foot.val2')}}
            </span>
        </div>
        <div class="servce-four-one flex align-items-center">
            <el-image src="/img/home/service.png" class="servce-four-one-icon"></el-image>
            <span class="servce-four-one-text">
              <!-- 一對一客服 -->
               {{$t('foot.val3')}}
            </span>
        </div>
        <div class="servce-four-one flex align-items-center">
            <el-image src="/img/home/cup.png" class="servce-four-one-icon"></el-image>
            <span class="servce-four-one-text">
              <!-- 会员制度 -->
               {{$t('foot.val7')}}
            </span>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.servce-four-one {
  width: 166px;
  height: 62px;
  background-color: #00acc8;
  border-radius: 6px;
  background: rgba(0, 172, 200, 0.08);
  margin-bottom: 10px;
}
.servce-four-one-icon {
  width: 40px;
  height: 47px;
}
// .servce-four-one-icon-zan {
//   width: 40px;
//   height: 47px;
// }
.servce-four-one-text {
  display: inline-flex;
  width: 102px;
  color: #2b6cb0;
  text-align: center;
  // font-feature-settings: "clig" off, "liga" off;
  // font-family: Outfit;
  font-size: 14px;
  font-weight: 600;
  margin: auto;
}
.h5-content-p {
  padding: 10px 16px;
  background-color: #fafafa;
}
</style>