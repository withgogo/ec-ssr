<template>
    <Head>
        <Title v-if="props.title">{{ props.title }}</Title>
        <Meta v-if="props.title" property='og:title' :content="props.title" />
        <Meta  v-if="props.description" name="description" :content="props.description" />
        <Meta v-if="props.description" property='og:description' :content="props.description" />
        <Meta v-if="props.keywords" name="Keywords" :content="props.keywords" />
    </Head>
</template>
<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    keywords: {
        type: String,
        default: ''
    }
})

</script>

<style lang="scss"></style>