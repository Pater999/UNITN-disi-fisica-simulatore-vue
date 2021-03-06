<template>
  <el-card class="info-card">
    <div slot="header" class="clearfix">
      <h5>INFORMAZIONI</h5>
    </div>
    <div>
      <strong>Codice sorgente simulatore: </strong>
      <el-link
        class="mb-1 ml-1"
        href="https://github.com/Pater999/UNITN-disi-fisica-simulatore-vue"
        type="primary"
      >
        GitHub
      </el-link>
    </div>
    <div>
      <div>
        <strong>© Simulatore sviluppato da: </strong>
        <el-link class="mb-1 ml-1" href="https://Pater999.it" type="primary">
          Pater999
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" src="./Info.ts" />
<style scoped lang="scss" src="./Info.scss" />
