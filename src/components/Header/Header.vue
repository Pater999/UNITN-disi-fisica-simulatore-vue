<template>
  <b-navbar toggleable="md" class="mt-2 myNavBar mb-3">
    <b-navbar-brand>
      <router-link to="/" class="myNavBar__brand d-flex align-items-center">
        <span>
          <img
            alt="logo"
            src="@/assets/img/logo.svg"
            class="myNavBar__brand__logo align-bottom mr-3"
          />
        </span>
        <span>Simulatore fisica</span>
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto mr-2">
        <b-nav-item>
          <router-link
            class="nav-link myNavBar__item mr-2"
            to="/"
            active-class="active"
            tag="li"
            exact
          >
            Simulazione
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link
            class="nav-link myNavBar__item mr-2"
            to="/domande"
            active-class="active"
            tag="li"
          >
            Domande
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link
            class="nav-link myNavBar__item mr-2"
            to="/statistiche"
            active-class="active"
            tag="li"
          >
            Statistiche
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./Header.ts" />
<style scoped lang="scss" src="./Header.scss" />
