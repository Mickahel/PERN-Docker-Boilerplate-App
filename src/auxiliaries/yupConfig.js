import { setLocale } from "yup";
import i18n from "i18n";
import * as Yup from "yup";
export default function yupConfig() {
  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: ({ path, reference }) => msg || i18n.t("yup.equalTo"),
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  function refEqualTo(ref, msg) {
    return this.test({
      name: "RefEqualTo",
      exclusive: false,
      message: ({ path, reference }) =>
        msg || i18n.t("yup.refEqualTo", { path, reference }),
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, "equalTo", equalTo);
  Yup.addMethod(Yup.string, "refEqualTo", refEqualTo);

  setLocale({
    // use constant translation keys for messages without values
    mixed: {
      default: i18n.t("yup.invalidField"),
      required: i18n.t("yup.required"),
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
      min: ({ min, path }) => i18n.t("yup.minNumber", { path: i18n.t(path), num: min }),
      max: ({ max, path }) => i18n.t("yup.maxNumber", { path: i18n.t(path), num: max })

    },
    string: {
      email: ({ email }) => i18n.t("yup.email", { email }),
      min: ({ min, path }) => i18n.t("yup.minString", { path, num: min })
    },
  });
}
