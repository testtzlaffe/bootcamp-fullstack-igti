const mongoose = require("mongoose");

(async () => {
  await mongoose.connect(
    "mongodb+srv://dbAdmin:zFAqUQ5lIH1oHb1p@cluster0.bazmo.mongodb.net/bootcamp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
})();

const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

mongoose.model("account", accountSchema);

const account = mongoose.model("account");

new account({
  agencia: 999,
  conta: 99999,
  name: "fulano",
  balance: 0,
})
  .save()
  .then(console.log("documento salvo com sucesso"))
  .catch((error) => {
    console.log("erro na criação do documento", error);
  });
