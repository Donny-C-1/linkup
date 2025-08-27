<script>
    let { children } = $props();
</script>

<div class="layout">
    {@render children()}
</div>

<style>
    .layout {
        height: 100vh;
        overflow: hidden;
    }
</style>