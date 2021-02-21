<template>
  <div v-loading.fullscreen.lock="isLoading">
    <el-card class="box-card result">
      <h4 slot="header" class="clearfix">Risultati</h4>
      <div v-if="!isLoading">
        <div v-if="promoted" class="text-center bg-success result__status">
          🎉🎉🎉 Complimenti hai passato il test! 🎉🎉🎉
        </div>
        <div v-else class="text-center bg-danger result__status">
          Mi spiace, non hai passato il test 😥
        </div>
        <div class="row mt-4">
          <div class="col-md-6 result__stats">
            <div>
              ▶ <strong>Voto in 30esimi: </strong>
              {{ points }}
            </div>
            <div>
              ▶ <strong>Voto in 30esimi senza penalità: </strong>
              {{ pointsNoPenalty }}
            </div>
            <div>
              ✅ <strong>Risposte corrette: </strong> {{ correctAnswers }}/{{
                totalQuestions
              }}
            </div>
            <div>
              ❎ <strong>Risposte sbagliate: </strong> {{ wrongAnswers }}/{{
                totalQuestions
              }}
            </div>
            <div>
              ⏹️ <strong>Risposte bianche: </strong> {{ whiteAnswers }}/{{
                totalQuestions
              }}
            </div>
            <div class="ml-1">
              ⌛<strong class="ml-1"> Tempo utilizzato: </strong>
              {{ msToTime(examTimeUsed) }}
            </div>
            <div class="mt-3 mb-4">
              ⚠️ Ogni risposta errata toglie
              <strong>{{ penalty }} </strong> * punteggio domanda
            </div>
            <div class="d-flex mt-5 mb-5">
              <el-button type="primary">
                Correggi le domande
              </el-button>
              <el-button @click="goToMenu()">
                Esci
              </el-button>
            </div>
          </div>
          <div class="col-md-6">
            <BarChart
              v-if="chartLoaded"
              :chartData="chartData"
              :showLegend="true"
              :chartTitle="false"
            />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" src="./Results.ts" />
<style lang="scss" src="./Results.scss" />
