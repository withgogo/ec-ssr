
export const useGroupStore = defineStore(
  "groupStore",
  () => {
    let groupId = ref()
    let isGroupPrivate = ref(0)
    const isPrivate = computed(() => {
      return isGroupPrivate.value;
    });
    return {
        groupId,
        isGroupPrivate,
        isPrivate
    };
  },
  {
    persist: true,
  }
);
