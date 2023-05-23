import { ComputedRef, ref, isRef, watchEffect, unref } from "vue";

export function useFetch(url: string | ComputedRef<string>) {
  const data: any = ref(null);
  const error: any = ref(null);

  async function doFetch() {
    data.value = null;
    error.value = null;
    const urlValue = unref(url);

    try {
      await timeOut();
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e: any) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return { data, error, doFetch };
}

function timeOut() {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      if (Math.random() * 10 + 1 > 3) {
        resolve();
      } else {
        reject(new Error("Random Error"));
      }
    }, 300);
  });
}
