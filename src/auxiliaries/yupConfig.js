import { setLocale } from 'yup';
import i18n from 'i18n'

export default function yupConfig () {
  setLocale({
    // use constant translation keys for messages without values
    mixed: {
      default: i18n.t("yup.invalidField"),
      required: i18n.t("yup.required")
    },
    // use functions to generate an error object that includes the value from the schema
    number: {

    },
    string:{
      email:({email}) =>i18n.t("yup.email", {email})
    }
  });
}