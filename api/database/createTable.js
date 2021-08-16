const ModelTable = require("../routes/fornecedores/ModelTableSupplier");

ModelTable.sync()
  .then(() => console.log("Table created!"))
  .catch((error) => console.log(error));
