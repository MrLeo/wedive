<template lang="pug">
    .page-group
        v-header(@changeLan="changeLan")
        transition
            router-view
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import * as types from '@/store/mutation-types'
    import Toast from '../components/toast'

    export default {
        name: 'Main',
        components: {
            vHeader: () => import('../components/Header') //动态组件
        },
        data: () => ({}),
        created() {
        },
        mounted() {
            // let token = this.$store.state.base.token //直接从vuex获取state
            // let version = this.$store.getters.versionGetter //直接从vuex获取getter
            // this.$store.dispatch('login', {username: '用户名', password: '密码'}).then(data => {}) //直接执行vuex的action
            // this.$store.commit(types.base.userInfo, {username: '用户名', password: '密码'})
        },
        watch: {},
        computed: {
            ...mapState({
                user: state => state.base.user, //vuex的state
            }),
            ...mapGetters({
                versionGetter: 'versionGetter', //vuex的getter（类似computed）
            }),
        },
        methods: {
            ...mapActions(['login']), //vuex的action
            ...mapMutations({
                setUserInfo: types.base.userInfo, //vuex的mutation
            }),
            /**
             * 改变本地语言
             * @param lan
             */
            changeLan(lan) {
                Toast(`切换语言：${lan}`)
                this.$i18n.locale = lan
                window.localStorage.setItem('lan', lan)
            },
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
