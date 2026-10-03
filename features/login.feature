# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Antecedentes:
    Dado que el cliente se encuentra en la página de inicio de sesión

  @smoke @positivo @standard_user
  Escenario: Iniciar sesión con un usuario estándar
    Cuando inicia sesión con el usuario "standard_user" y la contraseña "secret_sauce"
    Entonces ingresa al catálogo de productos

  @negativo @locked_out_user
  Escenario: Un usuario bloqueado no puede iniciar sesión
    Cuando inicia sesión con el usuario "locked_out_user" y la contraseña "secret_sauce"
    Entonces se muestra el mensaje "Epic sadface: Sorry, this user has been locked out."
    Y permanece en la página de inicio de sesión

  @negativo
  Esquema del escenario: No se permite el ingreso con <caso>
    Cuando inicia sesión con el usuario "<usuario>" y la contraseña "<contrasena>"
    Entonces se muestra el mensaje "<mensaje>"
    Y permanece en la página de inicio de sesión

    Ejemplos:
      | caso                  | usuario       | contrasena    | mensaje                                                                   |
      | contraseña incorrecta | standard_user | clave_erronea | Epic sadface: Username and password do not match any user in this service |
      | usuario no registrado | cliente_falso | secret_sauce  | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío         |               | secret_sauce  | Epic sadface: Username is required                                        |
      | contraseña vacía      | standard_user |               | Epic sadface: Password is required                                        |
