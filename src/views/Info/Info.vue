<template>
  <el-card class="info-card">
    <div slot="header" class="clearfix">
      <h5>INFORMAZIONI</h5>
    </div>
    <div>
      Simulatore web, sviluppato in
      <a href="https://vuejs.org/" target="_blank">Vue.JS</a>, per l'esame di
      fisica tenuto nel corso di Informatica dell'Università di Trento. Il
      simulatore è basato sulle domande degli esami degli anni precedenti.
    </div>
    <div class="mt-2">
      Se volete contribuire a questo simulatore aggiungendo ulteriori domande o
      correggendo eventuali errori potete farlo aprendo una
      <a
        href="https://github.com/Pater999/UNITN-disi-fisica-simulatore-vue/issues"
        target="_blank"
        >ISSUE
      </a>
      o facendo una
      <a
        target="_blank"
        href="https://github.com/Pater999/UNITN-disi-fisica-simulatore-vue/pulls"
        >PULL REQUEST
      </a>
      .
    </div>
    <div class="mt-3">
      <strong>PDF con domande e risposte esami precedenti: </strong>
      <el-link
        class="mb-1 ml-1"
        target="_blank"
        href="https://github.com/Pater999/UNITN-disi-fisica-simulatore-vue/releases"
        type="primary"
      >
        domande_esami_fisica_disi_unitn.pdf
      </el-link>
    </div>
    <div class="mt-4">
      <strong>Codice sorgente simulatore: </strong>
      <el-link
        class="mb-1 ml-1"
        target="_blank"
        href="https://github.com/Pater999/UNITN-disi-fisica-simulatore-vue"
        type="primary"
      >
        GitHub
      </el-link>
    </div>
    <div>
      <div>
        <strong>© Simulatore sviluppato da: </strong>
        <el-link
          class="mb-1 ml-1"
          target="_blank"
          href="https://Pater999.it"
          type="primary"
        >
          Pater999
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" src="./Info.ts" />
<style scoped lang="scss" src="./Info.scss" />
