/* Regras de negócio
 *
 * O email e documento devem ser únicos
 * Uma pessoa pode ter um nome com valor de no máximo 255 caracteres
 * A senha deve conter no mínimo 6 caracteres e no máximo 255 caracteres
 * A senha deve conter pelo menos um caractere com letra maiúscula
 * Todos os usuários consumidores são por padrão não administradores
 * Todos os usuários precisam ativar sua conta via token enviado por email
 *
 * Não deve ser exposto em nenhum endpoint os parâmetros:
 *  - document
 *  - isAdmin
 *  - isActive
 *  - hashForgottenPassword
 *  - activationToken
 */

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  hashForgottenPassword: string | null;
  activationToken: string | null;
};
export type UserDTO = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
};
