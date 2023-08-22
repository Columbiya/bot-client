export abstract class Command {
  execute(): void | Promise<void> {}
}
