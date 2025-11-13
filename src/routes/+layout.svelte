<script>
    import "../app.css";
    import { PUBLIC_UMAMI_WEBSITE_ID } from '$env/static/public';
</script>

<svelte:head>
  <script defer src="https://cloud.umami.is/script.js" data-website-id={PUBLIC_UMAMI_WEBSITE_ID}></script>
</svelte:head>

<slot />