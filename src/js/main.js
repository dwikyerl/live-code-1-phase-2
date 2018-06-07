import Vue from 'vue/dist/vue';
import axios from 'axios';

new Vue({
  el: '#app',
  data: {
    isLoggedIn: false,
    token: '',
    file: '',
    images: [],
    name: '',
    email: '',
  },
  create: {
    getImages() {
      this.getAllImages();
    }
  },
  methods: {
    requestToken(){
      const email = this.email;
      const name = this.name;
      axios.post('http://35.197.135.159/request-token', { email, name })
        .then(({data}) => {
          this.token = data.uuid;
          this.isLoggedIn = true;
          this.getAllImages();
        });
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      axios.post('http://35.197.135.159/image', formData, {
        headers: {
          authorization: this.token
        }
      })
      .then(({data}) => {
        console.log(data);
        this.getAllImages();
      })
      .catch(err => console.log(err));
    },
    getAllImages() {
      axios.get('http://35.197.135.159/image', {
        headers: {
          authorization: this.token
        }
      })
      .then(({data}) => {
        this.images = data;
      });
    }
  }
});