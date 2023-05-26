<script setup >

</script>
<template>
  <div class="view-main--container">

    <el-row :gutter="14" >
      <el-col :span="4">
        <button class="btn btn-1">按钮阴影👊</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-2">按钮气泡🫧</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-3">按钮波浪🌊</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-4 btn-4--1">按钮填充(左)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-4 btn-4--2">按钮填充(右)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-4 btn-4--3">按钮填充(上)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-4 btn-4--4">按钮填充(下)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-5">按钮立体</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-6">按钮小球</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-7">流动边框</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-8">渐变背景</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-9 btn-9--1">按钮线条(上下)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-9 btn-9--2">按钮线条(左右)</button>
      </el-col>
      <el-col :span="4">
        <button class="btn btn-9 btn-9--3">
          <span class="btn-9--mark"></span>
          按钮线条(上下左右)
        </button>
      </el-col>
    </el-row>
  </div>
</template>



<style scoped>
@import "btn.css";
</style>
