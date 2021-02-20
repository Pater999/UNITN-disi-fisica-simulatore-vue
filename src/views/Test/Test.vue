<template>
  <div class="test">
    <div class="row d-flex align-items-center">
      <div class="col-md-10 col-lg-11">
        <el-progress
          :show-text="false"
          :stroke-width="20"
          :percentage="timePercentage"
          :color="customColorMethod"
        />
      </div>
      <div class="col-md-2 col-lg-1 d-flex justify-content-end">
        <div class="mr-1 font-weight-bold">{{ formatTimeLeft() }}</div>
      </div>
    </div>
    <el-card class="box-card mt-3">
      <div slot="header" class="clearfix">
        <div class="test__question">
          <span>{{ currentQuestion }}. </span>
          <span v-html="examQuestions[currentQuestion - 1].question" />
        </div>
      </div>
      <el-checkbox-group
        @change="solutionChanged"
        :min="0"
        :max="1"
        v-model="userExamSolutions[currentQuestion - 1]"
      >
        <div class="mt-3">
          <el-checkbox label="A">
            <span
              class="test__answer"
              v-html="examQuestions[currentQuestion - 1].A"
            />
          </el-checkbox>
        </div>
        <div class="mt-1">
          <el-checkbox label="B">
            <span
              class="test__answer"
              v-html="examQuestions[currentQuestion - 1].B"
            />
          </el-checkbox>
        </div>
        <div class="mt-1">
          <el-checkbox label="C">
            <span
              class="test__answer"
              v-html="examQuestions[currentQuestion - 1].C"
            />
          </el-checkbox>
        </div>
        <div class="mt-1">
          <el-checkbox label="D">
            <span
              class="test__answer"
              v-html="examQuestions[currentQuestion - 1].D"
            />
          </el-checkbox>
        </div>
      </el-checkbox-group>
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

<script lang="ts" src="./Test.ts" />
<style lang="scss" src="./Test.scss" />
