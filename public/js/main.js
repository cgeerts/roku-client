  import LoginComponent from './components/TheLoginComponent.js';
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
  import TheMovieThumb from './components/TheMovieThumbnailComponent.js';
  import AllUsers from './components/TheAllUsersComponent.js';
  import HomeComponent from './components/TheHomeComponent.js';

  const router = new VueRouter({
      routes: [
          { path: '/', name: 'root', component: LoginComponent },
          { path: 'users', name: 'users', component: AllUsers },
          { path: '/home', name: 'home', component: HomeComponent, props: true }
      ]
  });

  (() => {
      const vm = new Vue({
          data: {
              authenticated: false,
              isAdmin: false,
              allMovies: []
          },

          created: function() {
                fetch('/api/movies')
                    .then(res => res.json())
                    .then(data => {
                        console.table(data);
                        this.allMovies = data;
              })
              .catch(err => console.error(err));
          },

          methods: {
            logout() {
                if (localStorage.getItem('cacheduser')) {
                    localStorage.removeItem('cacheduser');
                }
            }
          },
          components: {
          moviethumb: TheMovieThumb
          }
      }).$mount("#app");
  })();