import * as pvtsutils from "pvtsutils";
import * as pvutils from "pvutils";
import { HexBlockJson, HexBlockParams, HexBlock } from "../HexBlock";
import { ValueBlock, ValueBlockJson, ValueBlockParams } from "../ValueBlock";
import { checkBufferParams } from "./utils";

export interface ILocalBooleanValueBlock {
  value: boolean;
}

export interface LocalBooleanValueBlockParams extends ValueBlockParams, HexBlockParams, Partial<ILocalBooleanValueBlock> { }

export interface LocalBooleanValueBlockJson extends ValueBlockJson, HexBlockJson, ILocalBooleanValueBlock { }

export class LocalBooleanValueBlock extends HexBlock(ValueBlock) implements ILocalBooleanValueBlock {

  public static override NAME = "BooleanValueBlock";

  public value: boolean;

  constructor({
    value = false,
    ...parameters
  }: LocalBooleanValueBlockParams = {}) {
    super(parameters);

    this.value = value;

    if (parameters.valueHex) {
      this.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(parameters.valueHex);
    } else {
      this.valueHexView = new Uint8Array(1);
      if (this.value) {
        this.valueHexView[0] = 0xFF;
      }
    }
  }

  public override fromBER(inputBuffer: ArrayBuffer | Uint8Array, inputOffset: number, inputLength: number): number {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    // Basic check for parameters
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }

    // Getting Uint8Array
    this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);

    if (inputLength > 1)
      this.warnings.push("Boolean value encoded in more then 1 octet");

    this.isHexOnly = true;
    this.value = !!pvutils.utilDecodeTC.call(this);
    this.blockLength = inputLength;

    return (inputOffset + inputLength);
  }

  public override toBER(): ArrayBuffer {
    return this.valueHexView.slice();
  }

  public override toJSON(): LocalBooleanValueBlockJson {
    return {
      ...super.toJSON(),
      value: this.value,
    };
  }
}

export interface LocalBooleanValueBlock {
  /**
   * @deprecated since version 3.0.0
   */
  get valueBeforeDecode(): ArrayBuffer;
  /**
   * @deprecated since version 3.0.0
   */
  set valueBeforeDecode(value: ArrayBuffer);
  /**
   * Binary data in ArrayBuffer representation
   *
   * @deprecated since version 3.0.0
   */
  set valueHex(v: ArrayBuffer);
  /**
   * Binary data in ArrayBuffer representation
   *
   * @deprecated since version 3.0.0
   */
  get valueHex(): ArrayBuffer;
}
