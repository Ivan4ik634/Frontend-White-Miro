import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { DialogKeysSettings } from './Dialog';

interface Props {}

export const KeysSettings: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keys</CardTitle>
        <CardDescription>API Key for external access</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl">Token</h1>
            <p>The token is required to connect to the API</p>
          </div>
          <DialogKeysSettings />
        </div>
      </CardContent>
    </Card>
  );
};
