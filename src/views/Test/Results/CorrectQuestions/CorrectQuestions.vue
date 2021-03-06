<template>
  <div class="correct-test">
    <div class="row">
      <div class="mb-3 col-md-6 col-lg-7 col-xl-8">
        <div :class="['correct-test__status w-100 ', questionStatusClass()]">
          {{ questionStatusText() }}
        </div>
      </div>
      <div class="mb-3 col-md-6 col-lg-5 col-xl-4 d-flex align-items-center">
        <el-button class="ml-auto w-50" plain type="info">
          Vedi procedimento
        </el-button>
        <el-button
          class="ml-2 w-50"
          plain
          type="primary"
          @click="showStatistics = true"
        >
          Torna alle statistiche
        </el-button>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="correct-test__question">
          <span
            :class="['correct-test__question-points', questionStatusClass()]"
            >[{{ examQuestions[currentQuestion - 1].points }} punti]</span
          >
          <span class="ml-3">{{ currentQuestion }}. </span>
          <span v-html="examQuestions[currentQuestion - 1].question" />
        </div>
      </div>
      <div class="mt-3">
        <div class="fake-checkbox d-flex align-items-center">
          <div :class="['fake-checkbox__box', answerStatusClass('A')]" />
          <span
            :class="['fake-checkbox__answer', answerStatusClass('A')]"
            v-html="examQuestions[currentQuestion - 1].A"
          />
        </div>
      </div>
      <div class="mt-1">
        <div class="fake-checkbox d-flex align-items-center">
          <div :class="['fake-checkbox__box', answerStatusClass('B')]" />
          <span
            :class="['fake-checkbox__answer', answerStatusClass('B')]"
            v-html="examQuestions[currentQuestion - 1].B"
          />
        </div>
      </div>
      <div class="mt-1">
        <div class="fake-checkbox d-flex align-items-center">
          <div :class="['fake-checkbox__box', answerStatusClass('C')]" />
          <span
            :class="['fake-checkbox__answer', answerStatusClass('C')]"
            v-html="examQuestions[currentQuestion - 1].C"
          />
        </div>
      </div>
      <div class="mt-1">
        <div class="fake-checkbox d-flex align-items-center">
          <div :class="['fake-checkbox__box', answerStatusClass('D')]" />
          <span
            :class="['fake-checkbox__answer', answerStatusClass('D')]"
            v-html="examQuestions[currentQuestion - 1].D"
          />
        </div>
      </div>
    </el-card>
    <div class="d-flex justify-content-center mt-5 mb-4">
      <el-pagination
        background
        :pager-count="pagerCount"
        layout="prev, pager, next"
        :total="examQuestionsCount"
        :current-page.sync="currentQuestion"
        :page-size="1"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" src="./CorrectQuestions.ts" />
<style lang="scss" src="./CorrectQuestions.scss" />
