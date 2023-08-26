<script>
  import '../styles/app.scss';
</script>

<div class="app">
  <header>
    <h4>Kota's Chord Drill</h4>
  </header>
  <main>
    <slot />
  </main>

  <footer>
    <div>
      <a href="https://kota-yata.com">About</a>
      <span>・</span>
      <a href="https://kota-yata.com">Technical Requirement</a>
    </div>
    <div>
      <span>2023 @ <a href="https://kota-yata.com">Kota Yatagai</a></span>
    </div>
  </footer>
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    header {
      padding: 20px 0;
      text-align: center;
    }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
    }
  }
</style>
