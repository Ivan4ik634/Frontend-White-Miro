import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import { useUploadFile } from '@/hooks/useUploadFile';
import { userService } from '@/services/User.service';
import { EditProfileT, UserT } from '@/types/User';
import { Trash2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Props {
  profile: UserT;
}

export const ProfileCard: React.FC<Props> = ({ profile }) => {
  const [avatar, setAvatar] = useState(profile.avatar);
  const { t } = useTranslation();
  const { handleDeleteImage, handleUploadImage, ref } = useUploadFile((url) => setAvatar(url));
  const { register, handleSubmit } = useForm<Omit<EditProfileT, 'avatar'>>({
    defaultValues: {
      username: profile.username,
      email: profile.email,
    },
  });
  const onSubmit: SubmitHandler<Omit<EditProfileT, 'avatar'>> = async (data) => {
    const res = await userService.editProfile({
      ...data,
      username: profile.username === data.username ? '' : data.username,
      email: profile.email === data.email ? '' : data.email,
      avatar,
    });

    if ('message' in res) return toast.error(res.message);
    toast.success('Edit profile success');
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title_edit_profile')}</CardTitle>
        <CardDescription>{t('description_edit_profile')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-2 w-full">
            <Avatar className="flex max-[500px]:hidden ">
              <AvatarFallback>{profile.username[0]}</AvatarFallback>
              <AvatarImage src={avatar} />
            </Avatar>
            <div className="w-full">
              <div className="w-full flex max-[500px]:flex-col gap-y-2 items-center justify-between">
                <Button
                  className="flex items-center max-[500px]:w-full gap-x-2"
                  type="button"
                  onClick={() => ref.current?.click()}
                >
                  <UploadCloud />
                  {t('add_image')}
                </Button>
                <input onChange={handleUploadImage} ref={ref} type="file" className="hidden" />
                <Button
                  variant={'destructive'}
                  className="flex items-center max-[500px]:w-full gap-x-2"
                  type="button"
                  onClick={handleDeleteImage}
                >
                  <Trash2 />
                  {t('delete_image')}
                </Button>
              </div>
              <Avatar className="hidden mt-3 max-[500px]:block ">
                <AvatarFallback>{profile.username[0]}</AvatarFallback>
                <AvatarImage src={avatar} />
              </Avatar>
              <div className="mt-3 flex flex-col gap-y-3">
                <Input {...register('username', { required: true })} placeholder="UserName..." />
                <Input {...register('email', { required: true })} placeholder="Email..." />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button>{t('save')}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
