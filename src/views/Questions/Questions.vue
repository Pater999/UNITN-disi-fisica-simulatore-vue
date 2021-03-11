<template>
  <div class="mx-1" v-loading="isLoading">
    <div class="d-flex">
      <el-input placeholder="Cerca una domanda" v-model="questionSearch">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-checkbox
        class="ml-3"
        v-model="showSolutions"
        label="Mostra soluzioni"
        border
      ></el-checkbox>
    </div>

    <el-tabs
      type="border-card"
      class="mt-2"
      v-model="selectedTab"
      v-if="filteredQuestions"
    >
      <el-tab-pane label="Domande di teoria" name="theoreticalQuestions">
        <ol
          class="gradient-list"
          v-if="filteredQuestions.theoreticalQuestions.length > 0"
        >
          <li
            v-for="theoreticalQuestion in filteredQuestions.theoreticalQuestions"
            :key="`theo-${theoreticalQuestion.id}`"
            :seq="theoreticalQuestion.id - 1000"
          >
            <div v-html="theoreticalQuestion.question"></div>
            <ol type="A">
              <li
                :class="[
                  showSolutions && theoreticalQuestion.solution === 'A'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="theoreticalQuestion.A" />
              </li>
              <li
                :class="[
                  showSolutions && theoreticalQuestion.solution === 'B'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="theoreticalQuestion.B" />
              </li>
              <li
                :class="[
                  showSolutions && theoreticalQuestion.solution === 'C'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="theoreticalQuestion.C" />
              </li>
              <li
                :class="[
                  showSolutions && theoreticalQuestion.solution === 'D'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="theoreticalQuestion.D" />
              </li>
            </ol>
          </li>
        </ol>
        <div v-else>
          Nessuna domanda corrispondente alla ricerca trovata
        </div>
      </el-tab-pane>
      <el-tab-pane label="Esercizi semplici" name="simpleExercises">
        <ol
          class="gradient-list"
          v-if="filteredQuestions.simpleExercises.length > 0"
        >
          <li
            v-for="simpleExercise in filteredQuestions.simpleExercises"
            :key="`simpl-${simpleExercise.id}`"
            :seq="simpleExercise.id - 2000"
          >
            <div v-html="simpleExercise.question"></div>
            <div
              class="d-flex justify-content-end"
              v-if="simpleExercise.imageLink"
            >
              <el-link
                class="correct-test__link mt-2"
                @click="showImage(simpleExercise.imageLink)"
                type="primary"
              >
                Vedi immagine
              </el-link>
            </div>
            <ol type="A">
              <li
                :class="[
                  showSolutions && simpleExercise.solution === 'A'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="simpleExercise.A" />
              </li>
              <li
                :class="[
                  showSolutions && simpleExercise.solution === 'B'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="simpleExercise.B" />
              </li>
              <li
                :class="[
                  showSolutions && simpleExercise.solution === 'C'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="simpleExercise.C" />
              </li>
              <li
                :class="[
                  showSolutions && simpleExercise.solution === 'D'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="simpleExercise.D" />
              </li>
            </ol>
          </li>
        </ol>
        <div v-else>Nessuna domanda corrispondente alla ricerca trovata</div>
      </el-tab-pane>
      <el-tab-pane label="Esercizi difficili" name="difficultExercises">
        <ol
          class="gradient-list"
          v-if="filteredQuestions.difficultExercises.length > 0"
        >
          <li
            v-for="difficultExercise in filteredQuestions.difficultExercises"
            :key="`diffEx-${difficultExercise.id}`"
            :seq="difficultExercise.id - 3000"
          >
            <div v-html="difficultExercise.question"></div>
            <div
              class="d-flex justify-content-end"
              v-if="difficultExercise.imageLink"
            >
              <el-link
                class="correct-test__link mt-2"
                @click="showImage(difficultExercise.imageLink)"
                type="primary"
              >
                Vedi immagine
              </el-link>
            </div>
            <ol type="A">
              <li
                :class="[
                  showSolutions && difficultExercise.solution === 'A'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="difficultExercise.A" />
              </li>
              <li
                :class="[
                  showSolutions && difficultExercise.solution === 'B'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="difficultExercise.B" />
              </li>
              <li
                :class="[
                  showSolutions && difficultExercise.solution === 'C'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="difficultExercise.C" />
              </li>
              <li
                :class="[
                  showSolutions && difficultExercise.solution === 'D'
                    ? 'active'
                    : '',
                ]"
              >
                <span v-html="difficultExercise.D" />
              </li>
            </ol>
          </li>
        </ol>
        <div v-else>
          Nessuna domanda corrispondente alla ricerca trovata
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="Immagine"
      custom-class="my-modal"
      :visible.sync="imageDialogVisible"
    >
      <div class="text-center">
        <el-image :src="selectedImageLink">
          <div slot="placeholder" class="image-slot">
            Loading<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Questions.ts" />
<style scoped lang="scss" src="./Questions.scss" />
