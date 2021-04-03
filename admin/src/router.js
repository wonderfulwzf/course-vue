import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Admin from "./views/Admin.vue";
import Welcome from "./views/admin/Welcome.vue";
import Chapter from "./views/admin/Chapter.vue";
import Section from "./views/admin/Section.vue";
import Course from "./views/admin/Course.vue";
import Category from "./views/admin/Category.vue";
import Teacher from "./views/admin/Teacher.vue";
import File from "./views/admin/File.vue";
import User from "./views/admin/User.vue";
import Resource from "./views/admin/Resource.vue";
import Role from "./views/admin/Role.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "",
      redirect: "/login",
    },
    {
      path: "/",
      name: "admin",
      component: Admin,
      meta:{
        loginRequire:true,
      },
      children: [{
        name: "welcome",
        path: "welcome",
        component: Welcome,
      },{
        name: "business/category",
        path: "business/category",
        component: Category,
      },{
        name: "business/chapter",
        path: "business/chapter",
        component: Chapter,
      },{
        name: "business/section",
        path: "business/section",
        component: Section,
      },{
        name: "business/course",
        path: "business/course",
        component: Course,
      },{
        name: "business/teacher",
        path: "business/teacher",
        component: Teacher,
      },{
        name: "file/file",
        path: "file/file",
        component: File,
      },{
        name: "system/user",
        path: "system/user",
        component: User,
      },{
        name: "system/resource",
        path: "system/resource",
        component: Resource,
      },{
        name: "system/role",
        path: "system/role",
        component: Role,
      }]
    }
  ],
});
