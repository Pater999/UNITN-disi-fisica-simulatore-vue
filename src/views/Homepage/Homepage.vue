<template>
  <div class="d-flex justify-content-center">
    <el-card shadow="always" v-loading="isLoading" class="my-card">
      <div slot="header">
        <h4 class="text-center">Impostazioni esame</h4>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Tipo esame">
          <el-select
            v-model="form.examType"
            placeholder="Seleziona la tipologia di esame"
            class="w-100"
            @change="examTypeChanged"
          >
            <el-option label="Esame normale" :value="0"> </el-option>
            <el-option label="Esame covid" :value="1"> </el-option>
            <el-option label="Esame personalizzato" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Domande">
          <div class="block">
            <span>Domande teoria</span>
            <el-slider
              :disabled="lockValues"
              :min="0"
              v-model="form.theoreticalQuestionsCount"
              :max="counts.theoreticalQuestions"
              show-input
            />
          </div>
          <div class="block">
            <span>Esercizi semplici:</span>
            <el-slider
              :disabled="lockValues"
              :min="0"
              v-model="form.simpleExercisesCount"
              :max="counts.simpleExercises"
              show-input
            />
          </div>
          <div class="block">
            <span>Esercizi difficili:</span>
            <el-slider
              :disabled="lockValues"
              :min="0"
              :max="counts.difficultExercises"
              v-model="form.difficultExercisesCount"
              show-input
            />
          </div>
        </el-form-item>
        <el-form-item label="Opzioni">
          <div>
            <el-switch
              v-model="form.randomOrder"
              active-text="Domande in ordine casuale"
            />
          </div>
          <div v-show="false">
            <el-switch
              v-model="form.shuffle"
              active-text="Risposte in ordine casuale"
            />
          </div>
          <div>
            <el-switch
              v-model="form.infiniteTime"
              active-text="Tempo infinito"
              :disabled="lockValues"
            />
          </div>
        </el-form-item>
        <el-form-item label="Durata">
          <div>
            <el-slider
              :disabled="lockValues || form.infiniteTime"
              :min="1"
              :step="30"
              :max="1440"
              v-model="form.time"
              :format-tooltip="timeTooltip"
            />
          </div>
        </el-form-item>
        <div class="d-flex">
          <el-button
            type="success"
            @click="startTest"
            class="ml-auto mr-auto my-button"
          >
            Inizia il test
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" src="./Homepage.ts" />
<style scoped lang="scss" src="./Homepage.scss" />
