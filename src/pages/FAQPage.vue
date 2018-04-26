<template>

  <v-container>
    <v-layout wrap justify-center>
      <v-flex xs12 tag="h2" class="text-xs-center mb-5 display-1 font-weight-bold">FAQ</v-flex>

      <v-flex xs12 sm9>
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content v-for="(item,i) in faq" :key="i">
            <div slot="header" v-text="item.question" class="title"></div>
            <v-card>
              <v-card-text v-html="item.answer"></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      faq: [
          /* eslint-disable no-irregular-whitespace */
        {
          question: 'How do I create a Supranex Bitcoin Savings Account?',
          answer: `If you are a new user, Click “Create Account” and enter your information. Click “Submit”. Check the e-mail we send to you and click the link to verify your e-mail. Your ​Supranex Bitcoin Savings Account​ ​is created. Simple!`
        },
        {
          question: 'How do I login?',
          answer: `Use your e-mail address and password to login to your Supranex Bitcoin Savings Account.`
        },
        {
          question: 'How do I deposit fund?',
          answer: `Login to your account and click “Deposit”. <br><br>

          Type in the amount you wish to save. <br><br>

          Then click “Save Now”. Supranex will generate a bitcoin address for you. Copy the bitcoin address and send your fund to thisaddress. After 3 confirmations, your fund will show in your account. Immediately, your interest will start accumulating. <br><br>

          You can deposit as many times as possible. Each deposit will automatically calculate its maturity date.`
        },
        {
          question: 'What is the deposit method?',
          answer: `The deposit method is Bitcoin.`
        },
        {
          question: 'How long does it take to deposit?',
          answer: `Bitcoin deposit is usually instant. However, it takes some time for bitcoin network to actually confirm your transactions. We need 3 confirmations to process your deposit.`
        },
        {
          question: 'How much can I deposit?',
          answer: `The minimum deposit is $100. The maximum is unlimited.`
        },
        {
          question: 'Are my deposits treated seperately?',
          answer: `Yes. Every deposit is treated as a separate savings with its own maturity time. You can deposit as many times as possible.`
        },
        {
          question: 'Is my fund secured?',
          answer: `Absolutely! Your fund is secured. ​We are a team of reputable veteran cryptocurrency experts whose main priority is honesty, transparency and prosperity of our clients. <br><br>

          Our website is well secured . We don’t store your funds on our website. Even the withdrawals are processed by our account department to ensure that your funds are not compromised.`
        },
        {
          question: 'What is withdrawal method?',
          answer: `The withdrawal method is Bitcoin.`
        },
        {
          question: 'How do I withdraw?',
          answer: `Login to your account. Click “Withdraw”. Enter the amount you wish to withdraw. Click “Process”. Your withdrawal will be processed and both your capital and 100% interest will be sent to the Bitcoin address you used to deposit. <br><br>

          This measure is taken to protect your funds.`
        },
        {
          question: 'How long does it take to withdraw?',
          answer: `It takes about 24 hrs to process your withdrawal. Withdrawals are processed by our account department to ensure your funds are not compromised.`
        },
        {
          question: 'Do you charge any fee for deposit / withdrawal?',
          answer: `Deposit is free . Withdrawal is also free. <br><br>

          However, in the case of withdrawal, Supranex does not cover miners fee for the transactions. The miners fee is not fixed and it’s deducted from client’s account. The fee is not determined by Supranex, but by network miners and it goes directly to them. This is a similar fee you see in your bitcoin wallet whenever you want to transfer fund.`
        },
        {
          question: 'When can I withdraw?',
          answer: `Your fund and 100% interest are available for withdrawal at the maturity of your savings, which is 365 days after your deposit. Each deposit is treated separately.`
        },
        {
          question: 'Can I withdraw before the maturity date?',
          answer: `Yes. You can withdraw your fund at any time you so desire. However, this emergency withdrawal will attract some administrative charges and the interest accrued will be forfeited.`
        },
        {
          question: 'How do I withdraw before maturity date?',
          answer: `To withdraw before maturity date, you are required to send a request to : <a href="mailto:finance​@supranex.com​">finance​@supranex.com​</a> from the  e-mail address attached to your account. ​Your withdrawal will be processed within 24 hrs and fund transferred to the same Bitcoin address you used to deposit. <br><br> This measure is taken to protect your funds.<br><br> The minimum you can withdraw is $100.`
        },
        {
          question: 'What is 2-factor authentication?',
          answer: `2FA authentication is a method for keeping your account protected. To log in to your Supranex account, you’ll need a second device with Google Authenticator installed. <br><br>

          You may turn the verification off at anytime you want.`
        },
        {
          question: 'How does Supranex generate the fund to pay my interest',
          answer: `Our team of veteran cryptocurrency experts will put your money to work by investing it in profitable cryptocurrencies to ensure that your 100% interest is delivered to you.`
        }
      ]
    }
  }
}
</script>
