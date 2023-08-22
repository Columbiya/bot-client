export abstract class CommandProcessor {
  abstract processCommand(command: string): void | Promise<void>
}
