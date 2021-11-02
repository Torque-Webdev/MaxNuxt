<template>
  <div>
    <form class="needs-validation" novalidate @submit.prevent="submitForm">
      <mdb-card>
        <mdb-card-header class="text-center">
          <h3>Contact Us</h3>
        </mdb-card-header>
        <mdb-card-body class="container">
          <mdb-card-text class="pb-4 text-center" mr-4 ml-4>
            Do you have any questions? Please do not hesitate to contact us
            directly. We will get back to you within a matter of hours to
            help you.
          </mdb-card-text>
          <mdb-row>
            <mdb-col>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="fields.name" label="Your name" required />
                </mdb-col>
                <mdb-col>
                  <mdb-input v-model="fields.email" type="email" label="Your email" required />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input v-model="fields.subject" label="Subject" required />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input
                    v-model="fields.message"
                    type="textarea"
                    :rows="5"
                    label="Your message"
                    required
                  />
                </mdb-col>
              </mdb-row>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
        <div class="g-recaptcha" data-sitekey></div>
        <mdb-card-footer class="text-center">
          <mdb-btn color="secondary" type="submit">Send</mdb-btn>
        </mdb-card-footer>
      </mdb-card>
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

import {
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardFooter,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbCardText,
} from "mdbvue";
export default {
  components: {
    mdbCardHeader,
    mdbCardFooter,
    mdbCard,
    mdbBtn,
    mdbCardBody,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbCardText,
  },
  data() {
    return {
      modal: false,
      fields: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    validate() {
      const form = [...arguments];
      const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      for (const index in form) {
        const field = form[index];
        if (field === "email" && !emailRegexp.test(this.fields[field])) {
          return false;
        } else if (this.fields[field] === "") {
          return false;
        }
      }
      return true;
    },
    submitForm(event) {
      event.target.classList.add("was-validated");
      console.log("clicked");
      if (this.validate("email", "name", "message", "subject")) {
        emailjs.sendForm("gmail", "", event.target, "").then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
            event.target.classList.remove("was-validated");
            this.fields = {};
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      }
    },
  },
};
</script>
