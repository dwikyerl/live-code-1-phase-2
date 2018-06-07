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
      console.log(this.file);
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
      });
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