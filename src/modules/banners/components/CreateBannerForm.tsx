import {Form, Formik} from "formik";
import FormField from "@/components/forms/FormField";
import * as Yup from 'yup'
import {Button} from "@components";
import BannerCategorySelectField from "@/modules/banners/components/forms/BannerCategorySelectField";
import CitySelectField from "@/modules/banners/components/forms/CitySelectField";
import BannerDesktopImageFormSection from "@/modules/banners/components/BannerDesktopImageFormSection";
import BannerMobileImageFormSection from "@/modules/banners/components/BannerMobileImageFormSection";
import {useRecoilState} from "recoil";
import BannerDesktopImageState from "@/modules/banners/atoms/BannerDesktopImageState";
import {useToast} from "@hooks";
import BannerMobileImageState from "@/modules/banners/atoms/BannerMobileImageState";
import {useMutation} from "@apollo/client";
import createBannerMutation from "@/modules/banners/mutations/createBannerMutation";
import {BannerCategoryType} from "@types";
import useImageUploader from "@/hooks/useImageUploader";
import {useModal} from "@ebay/nice-modal-react";
import bannersQuery from "@/modules/banners/queries/bannersQuery";

interface FormValues {
  title: string;
  category: string;
  city: string;
  isActive: boolean;
}

const CreateBannerForm = () => {
  const [bannerDesktopImage, setBannerDestopImage] = useRecoilState(BannerDesktopImageState)
  const [bannerMobileImage, setBannerMobileImage] = useRecoilState(BannerMobileImageState)

  const toast = useToast()
  const modal = useModal()
  const {uploadImage, loading: uploadingImages} = useImageUploader()
  const [createBanner, {loading}] = useMutation(createBannerMutation, {
    onCompleted: () => {
      setBannerDestopImage(null)
      setBannerMobileImage(null)
      modal.remove()
      toast("Banner creado con éxito", "success", {id: "upload-mob-img"})
    },
    onError: () => {
      toast("error creando el banner", "error", {id: "upload-mob-img"})
    },
    refetchQueries: [bannersQuery]
  })

  const initialValues: FormValues = {
    title: '',
    category: '',
    city: '',
    isActive: false,
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Este campo es requerido"),
    category: Yup.string().required("Este campo es requerido"),
    city: Yup.string().required("Este campo es requerido"),
    isActive: Yup.boolean().required("Este campo es requerido"),
  })

  const onSubmit = async (values: FormValues) => {

    if (!bannerDesktopImage) {
      toast('debes seleccionar una imagen para computador', "error", {id: "error-desk-img"})
    }

    if (!bannerMobileImage) {
      toast('debes seleccionar una imagen para celular', "error", {id: "error-mob-img"})
    }

    toast('Subiendo imagenes', "loading", {id: "upload-mob-img"})

    const url = bannerDesktopImage && await uploadImage(bannerDesktopImage)
    const mobileUrl = bannerMobileImage && await uploadImage(bannerMobileImage)

    toast('Creando banner', "loading", {id: "upload-mob-img"})

    await createBanner({
        variables: {
          input: {
            title: values.title,
            cityId: values.city,
            category: values.category as BannerCategoryType,
            url: url && url.url ? url.url : "",
            mobileUrl: mobileUrl && mobileUrl.url ? mobileUrl.url : "",
            isActive: values.isActive
          }
        }
      }
    )
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {
        () => (
          <Form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <FormField name="title" label="Titulo"/>
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
                {(loading || uploadingImages) ? 'Creando...' : 'Crear Banner'}
              </Button>
            </div>

          </Form>
        )
      }
    </Formik>
  )
}

export default CreateBannerForm