# language: es
@compra
Característica: Proceso de compra
  Como cliente de Sauce Demo
  Quiero completar la compra de los productos de mi carrito
  Para adquirir los productos que necesito

  Antecedentes:
    Dado que el cliente inició sesión como "standard_user"

  @smoke @e2e @positivo
  Escenario: Completar la compra de un producto hasta la confirmación
    Dado que agregó al carrito los productos:
      | Sauce Labs Backpack |
    Y ingresa al carrito de compras
    Y inicia el proceso de compra
    Y registra sus datos de envío con nombre "Antonio", apellido "Ramírez" y código postal "15001"
    Cuando confirma la compra
    Entonces se muestra la confirmación "Thank you for your order!"
    Y el carrito queda vacío

  @positivo
  Escenario: El resumen de compra calcula correctamente los montos
    Dado que agregó al carrito los productos:
      | Sauce Labs Backpack     |
      | Sauce Labs Bolt T-Shirt |
    Y ingresa al carrito de compras
    Y inicia el proceso de compra
    Cuando registra sus datos de envío con nombre "Lucía", apellido "Torres" y código postal "15074"
    Entonces el subtotal es igual a la suma de los precios de los productos
    Y el total es igual al subtotal más los impuestos

  @negativo
  Esquema del escenario: No se puede continuar la compra sin <dato>
    Dado que agregó al carrito los productos:
      | Sauce Labs Onesie |
    Y ingresa al carrito de compras
    Y inicia el proceso de compra
    Cuando registra sus datos de envío con nombre "<nombre>", apellido "<apellido>" y código postal "<codigo>"
    Entonces se muestra el mensaje "<mensaje>"
    Y permanece en el formulario de datos de envío

    Ejemplos:
      | dato          | nombre | apellido | codigo | mensaje                        |
      | nombre        |        | Pérez    | 15001  | Error: First Name is required  |
      | apellido      | Carlos |          | 15001  | Error: Last Name is required   |
      | código postal | Carlos | Pérez    |        | Error: Postal Code is required |
