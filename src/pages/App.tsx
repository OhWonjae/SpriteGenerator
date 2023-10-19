import { Container } from '@/components/Container';
import { ContainerInner } from '@/components/ContainerInner';
import { FileUploader } from '@/components/FileUploader';
import { SpriteArea } from '@/components/SpriteArea';
import { OutputArea } from '@/components/OutputArea';
import { useAtom } from 'jotai/index';
import { FilesAtom } from '@/atoms/atoms';
import { Empty } from '@/components/Empty';

const App = () => {
  const [files] = useAtom(FilesAtom);
  return (
    <Container title={'Sprite Generator'}>
      <ContainerInner>
        {files.length > 0 ? (
          <>
            <FileUploader />
            <SpriteArea />
            <OutputArea />
          </>
        ) : (
          <Empty />
        )}
      </ContainerInner>
    </Container>
  );
};

export default App;
