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

interface Props {
  node: BannerNode
}

interface FormValues {
  title: string;
  category: string;
  city: string;
  isActive: boolean;
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
      toast("Banner creado con éxito", "success", {id: "upload-mob-img"})
    },
    onError: () => {
      toast("error creando el banner", "error", {id: "upload-mob-img"})
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
    city: node.city?.id ?? "",
    category: node.category,
    isActive: node.isActive
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Este campo es requerido"),
    category: Yup.string().required("Este campo es requerido"),
    city: Yup.string().required("Este campo es requerido"),
    isActive: Yup.boolean().required("Esta campo es requirido")
  })

  const onSubmit = async (values: FormValues) => {
    if (!bannerDesktopImage) {
      toast('debes seleccionar una imagen para computador', "error", {id: "error-desk-img"})
    }

    if (!bannerMobileImage) {
      toast('debes seleccionar una imagen para celular', "error", {id: "error-mob-img"})
    }

    toast('Subiendo imagenes', "loading", {id: "upload-mob-img"})

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
          cityId: values.city,
          category: values.category as BannerCategoryType,
          url: url ? url : "",
          mobileUrl: mobileUrl ? mobileUrl : "",
          isActive: values.isActive
        }
      }
    })
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

