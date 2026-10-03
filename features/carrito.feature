# language: es
@carrito
Característica: Carrito de compras
  Como cliente de Sauce Demo
  Quiero agregar productos al carrito
  Para revisarlos antes de comprarlos

  Antecedentes:
    Dado que el cliente inició sesión como "standard_user"

  @smoke @positivo
  Escenario: Agregar un producto al carrito desde la página de productos
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el carrito indica 1 producto
    Y el producto "Sauce Labs Backpack" figura como agregado

  @positivo
  Escenario: Ver en el carrito los productos agregados
    Dado que agregó al carrito los productos:
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    Cuando ingresa al carrito de compras
    Entonces visualiza en el carrito los productos:
      | producto              | precio |
      | Sauce Labs Backpack   | $29.99 |
      | Sauce Labs Bike Light | $9.99  |

  @positivo
  Escenario: Quitar un producto del carrito
    Dado que agregó al carrito los productos:
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    Y ingresa al carrito de compras
    Cuando quita el producto "Sauce Labs Bike Light" del carrito
    Entonces el carrito indica 1 producto
    Y el producto "Sauce Labs Bike Light" ya no está en el carrito
