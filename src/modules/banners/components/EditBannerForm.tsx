import {useRecoilState} from "recoil";
import BannerDesktopImageState from "@/modules/banners/atoms/BannerDesktopImageState";
import BannerMobileImageState from "@/modules/banners/atoms/BannerMobileImageState";
import {BannerCategoryType, BannerNode} from "@types";
import {FC, useEffect} from "react";
import {v4} from "uuid";
import {Form, Formik} from "formik";
import FormField from "@/components/forms/FormField";
import BannerCategorySelectField from "@/modules/banners/components/forms/BannerCategorySelectField";
import CitySelectField from "@/modules/banners/components/forms/CitySelectField";
import BannerDesktopImageFormSection from "@/modules/banners/components/BannerDesktopImageFormSection";
import BannerMobileImageFormSection from "@/modules/banners/components/BannerMobileImageFormSection";
import {Button} from "@components";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import editBannerMutation from "@/modules/banners/mutations/editBannerMutation";
import {useToast} from "@hooks";
import useImageUploader from "@/hooks/useImageUploader";
import bannersQuery from "@/modules/banners/queries/bannersQuery";
import {useModal} from "@ebay/nice-modal-react";
import {FormikHelpers} from "formik";

interface Props {
  node: BannerNode
}

interface FormValues {
  title: string;
  action: string;
  category: string;
  city: string;
  isActive: boolean;
  position?: number;
}

const EditBannerForm: FC<Props> = ({node}) => {
  const [bannerDesktopImage, setBannerDesktopImage] = useRecoilState(BannerDesktopImageState)
  const [bannerMobileImage, setBannerMobileImage] = useRecoilState(BannerMobileImageState)

  const toast = useToast()
  const modal = useModal()
  const {uploadImage, loading: uploadingImages} = useImageUploader()
  const [editBanner, {loading}] = useMutation(editBannerMutation, {
    onCompleted: () => {
      setBannerDesktopImage(null)
      setBannerMobileImage(null)
      modal.remove()
      toast("Banner actualizado con éxito", "success", {id: "edit-banner"})
    },
    refetchQueries: [bannersQuery]
  })

  useEffect(() => {
    if (node.url) {
      setBannerDesktopImage({
        id: v4(),
        file: null,
        preview: node.url as string
      })
    }

    if (node.mobileUrl) {
      setBannerMobileImage({
        id: v4(),
        file: null,
        preview: node.mobileUrl as string
      })
    }
  }, [])

  const initialValues: FormValues = {
    title: node.title,
    action: node.action ?? "",
    city: node.city?.id ?? "",
    category: node.category,
    isActive: node.isActive,
    position: node.position ?? undefined
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Este campo es requerido"),
    action: Yup.string()
      .url("Debe ser una URL válida")
      .required("Este campo es requerido"),
    category: Yup.string().required("Este campo es requerido"),
    city: Yup.string().required("Este campo es requerido"),
    isActive: Yup.boolean().required("Esta campo es requirido"),
    position: Yup.number()
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero")
      .nullable()
      .transform((value, originalValue) => originalValue === "" ? null : value),
  })

  const onSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    if (!bannerDesktopImage) {
      toast('debes seleccionar una imagen para computador', "error", {id: "error-desk-img"})
      return
    }

    if (!bannerMobileImage) {
      toast('debes seleccionar una imagen para celular', "error", {id: "error-mob-img"})
      return
    }

    toast('Subiendo imagenes', "loading", {id: "edit-banner"})

    try {
      const {url} = bannerDesktopImage?.file
        ? await uploadImage(bannerDesktopImage)
        : {url: bannerDesktopImage?.preview}

      const {url: mobileUrl} = bannerMobileImage?.file
        ? await uploadImage(bannerMobileImage)
        : {url: bannerMobileImage?.preview}

      await editBanner({
        variables: {
          input: {
            id: node.id,
            title: values.title,
            action: values.action,
            cityId: values.city,
            category: values.category as BannerCategoryType,
            url: url ? url : "",
            mobileUrl: mobileUrl ? mobileUrl : "",
            isActive: values.isActive,
            position: values.category === BannerCategoryType.Regular ? (values.position || null) : null
          }
        }
      })
    } catch (error: any) {
      // Extraer el mensaje de error de GraphQL
      let errorMessage = 'Error al actualizar el banner'

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const firstError = error.graphQLErrors[0]

        // El mensaje puede venir en differentes formatos
        if (firstError.message) {
          errorMessage = firstError.message
        }

        // Si hay errores de validacion extensibles
        if (firstError.extensions) {
          console.log('Extensions:', firstError.extensions)
        }
      }

      toast(errorMessage, "error", {id: "edit-banner"})

      // Si el error es sobre la posicion, establecer el error en el campo
      if (errorMessage.toLowerCase().includes('posición') ||
          errorMessage.toLowerCase().includes('position') ||
          errorMessage.toLowerCase().includes('banner regular')) {
        helpers.setFieldError('position', errorMessage)
      }
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
      {
        ({values}) => (
          <Form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <FormField name="title" label="Titulo" className="w-full"/>
                <FormField name="action" label="Accion(url)" className="w-full"/>
              </div>
              <div className="flex gap-x-2">
                <FormField
                  name="category"
                  label="Categoria"
                  className="w-1/2"
                  component={BannerCategorySelectField}/>
                <FormField
                  name="city"
                  label="ciudad"
                  className="w-1/2"
                  component={CitySelectField}/>
              </div>
              {values.category === BannerCategoryType.Regular && (
                <div className="flex gap-x-2">
                  <FormField
                    name="position"
                    label="Posición"
                    type="number"
                    placeholder="Ej: 1, 2, 3..."
                    className="w-full"
                    min="1"
                    step="1"
                  />
                </div>
              )}
              <div className="w-full flex justify-center">
                <FormField
                  name="isActive"
                  label="Activo"
                  type="checkbox"
                  className="w-fit "/>
              </div>
            </div>


            <BannerDesktopImageFormSection/>
            <BannerMobileImageFormSection/>

            <div className='flex justify-center pt-4'>
              <Button type="submit">
                {(loading || uploadingImages) ? 'Actualizando...' : 'Actualizar Banner'}
              </Button>
            </div>

          </Form>
        )
      }
    </Formik>
  )
}

export default EditBannerForm
