import { postsCollection, newsPage } from '@/services/firebase'

export const state = () => ({
  allPosts: [],
  post: null,
  postsByYear: [],
  page: null,
})

export const mutations = {
  setPosts(state, val) {
    if (val) {
      state.allPosts = val
    } else {
      state.allPosts = []
    }
  },
  setPostsByYear(state, val) {
    if (val) {
      state.postsByYear = val
    } else {
      state.postsByYear = []
    }
  },
  setPost(state, val) {
    if (val) {
      state.post = val
    } else {
      state.post = null
    }
  },
  setPage(state, val) {
    if (val) {
      state.page = val
    } else {
      state.page = null
    }
  },
  clearPost(state) {
    state.post = null
  },
  clearPosts(state) {
    state.allPosts = null
  },
}

export const actions = {
  setPost({ commit }, id) {
    postsCollection
      .doc(id)
      .get()
      .then((doc) => {
        const post = doc.data()
        commit('setPost', post)
      })
  },
  setPostSlug({ commit }, slug) {
    postsCollection.where('slug', '==', slug).onSnapshot((doc) => {
      doc.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        commit('setPost', post)
      })
    })
  },
  setPosts({ commit }) {
    postsCollection.orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const postsArray = []

      querySnapshot.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        postsArray.push(post)
      })
      commit('setPosts', postsArray)
    })

    newsPage.onSnapshot((querySnapshot) => {
      const postsArray = []

      querySnapshot.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        postsArray.push(post)
      })
      commit('setPage', postsArray[0])
    })
  },
  setPostsByYear({ commit }, year) {
    postsCollection
      .where('year', '==', year)
      .orderBy('date', 'desc')
      .onSnapshot((doc) => {
        const postsArray = []

        doc.forEach((doc) => {
          const post = doc.data()
          post.id = doc.id
          postsArray.push(post)
        })
        commit('setPostsByYear', postsArray)
      })
  },
}

export const getters = {
  getPost(state) {
    return state.post
  },
  getPosts(state) {
    return state.allPosts
  },
  getPostsByYear(state) {
    return state.postsByYear
  },
  getPage(state) {
    return state.page
  },
}
