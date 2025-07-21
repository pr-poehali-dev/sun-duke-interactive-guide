import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface StepData {
  id: number;
  title: string;
  content: string;
  warning?: string;
  isCompleted: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasCredentials, setHasCredentials] = useState(false);

  // Извлечение логина и пароля из URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get('login') || '';
    const password = urlParams.get('password') || '';
    setCredentials({ login, password });
    setHasCredentials(Boolean(login && password));
  }, []);

  const steps: StepData[] = [
    {
      id: 1,
      title: "⚠️ Важные ограничения",
      content: "СТРОГО ЗАПРЕЩЕНО ВХОДИТЬ В ПРОФИЛЬ СО СМАРТФОНА ИЛИ ПК! При попытке входа со стороннего устройства в выдаче будет отказано, без возврата средств.",
      warning: "Используйте только консоль для входа в аккаунт",
      isCompleted: completedSteps.includes(1)
    },
    {
      id: 2,
      title: "🎮 Создание пользователя",
      content: "На консоли откройте ⚙️ Системные настройки → Пользователь → Добавить пользователя → Создать нового пользователя. Выберите любые аватарку и ник, нажмите ОК.",
      isCompleted: completedSteps.includes(2)
    },
    {
      id: 3,
      title: "🔑 Вход в аккаунт",
      content: `Нажмите "Войти и установить связь". Когда появится QR, выберите "Другой способ для входа". Введите логин: ${credentials.login || '[будет показан в URL]'} и пароль: ${credentials.password || '[будет показан в URL]'}`,
      isCompleted: completedSteps.includes(3)
    },
    {
      id: 4,
      title: "✅ Завершение настройки",
      content: "Уточните у продавца код подтверждения и быстро введите его. Нажмите Далее → Связать → ОК. В разделе Пользователи выберите новый профиль и установите Настройки онлайн-лицензии в положение ВКЛ.",
      isCompleted: completedSteps.includes(4)
    },
    {
      id: 5,
      title: "📥 Загрузка игр",
      content: "Вернитесь на 🏠 Домашнюю страницу. Откройте Виртуальные игровые карты → выберите добавленного пользователя → нажмите на игру → Параметры → Загрузить данные.",
      isCompleted: completedSteps.includes(5)
    },
    {
      id: 6,
      title: "✈️ Важная памятка",
      content: "Игры запускаются только с интернетом. СРАЗУ после запуска игры включайте режим полёта! Не меняйте данные профиля. Несоблюдение может привести к слёту аккаунта.",
      warning: "Обязательно включайте режим полёта после запуска игры",
      isCompleted: completedSteps.includes(6)
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Если нет данных в URL, показываем экран приветствия
  if (!hasCredentials) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <img 
              src="https://cdn.poehali.dev/files/1f2f71c9-9139-41ea-b95a-6f66419d9cc0.png" 
              alt="Сундук" 
              className="w-16 h-16 object-contain mx-auto mb-4"
            />
            <CardTitle className="text-2xl">Добро пожаловать!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-center">
              Для использования инструкции необходимо передать данные для входа в аккаунт через URL.
            </p>
            <Alert>
              <Icon name="Info" size={16} />
              <AlertDescription>
                <strong>Как передать данные:</strong><br/>
                Добавьте к URL параметры:<br/>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  ?login=ваш_логин&password=ваш_пароль
                </code>
              </AlertDescription>
            </Alert>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">Пример ссылки:</h4>
              <code className="text-xs bg-white p-2 rounded block border break-all">
                {window.location.origin}?login=example@email.com&password=mypassword123
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/1f2f71c9-9139-41ea-b95a-6f66419d9cc0.png" 
              alt="Сундук" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Инструкция по активации</h1>
              <p className="text-gray-600">Магазин игровых аккаунтов "Сундук"</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс выполнения</span>
              <span className="text-sm text-gray-500">{completedSteps.length} из {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Шаги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step) => (
                  <Button
                    key={step.id}
                    variant={currentStep === step.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : currentStep === step.id 
                        ? 'bg-amber-500 text-white' 
                        : 'hover:bg-amber-50'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex items-center gap-3">
                      {completedSteps.includes(step.id) ? (
                        <Icon name="CheckCircle" size={20} className="text-green-600" />
                      ) : (
                        <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 text-sm flex items-center justify-center font-medium flex-shrink-0">
                          {step.id}
                        </span>
                      )}
                      <span className="text-sm font-medium">
                        {step.title.replace(/[⚠️🎮🔑✅📥✈️]/g, '').trim()}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-3">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {steps.find(s => s.id === currentStep)?.title}
                  </CardTitle>
                  <Badge variant={completedSteps.includes(currentStep) ? "default" : "secondary"}>
                    {completedSteps.includes(currentStep) ? 'Выполнено' : 'В процессе'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.find(s => s.id === currentStep)?.warning && (
                  <Alert className="border-red-200 bg-red-50">
                    <Icon name="AlertTriangle" size={16} className="text-red-600" />
                    <AlertDescription className="text-red-800">
                      {steps.find(s => s.id === currentStep)?.warning}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {steps.find(s => s.id === currentStep)?.content}
                  </p>
                </div>

                {/* Credentials Display */}
                {currentStep === 3 && (credentials.login && credentials.password) && (
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4 text-amber-800 text-lg">Ваши данные для входа:</h4>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-amber-700 text-sm">Логин:</span>
                          <code className="bg-white px-3 py-2 rounded text-base border font-mono break-all">{credentials.login}</code>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-amber-700 text-sm">Пароль:</span>
                          <code className="bg-white px-3 py-2 rounded text-base border font-mono break-all">{credentials.password}</code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-4 pt-6">
                  <Button
                    onClick={() => toggleStepCompletion(currentStep)}
                    variant={completedSteps.includes(currentStep) ? "outline" : "default"}
                    className={`w-full ${completedSteps.includes(currentStep) ? "border-green-300 text-green-700" : "bg-amber-500 hover:bg-amber-600"}`}
                  >
                    <Icon 
                      name={completedSteps.includes(currentStep) ? "RotateCcw" : "Check"} 
                      size={16} 
                      className="mr-2" 
                    />
                    {completedSteps.includes(currentStep) ? 'Отменить' : 'Выполнено'}
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex-1"
                    >
                      <Icon name="ChevronLeft" size={16} className="mr-2" />
                      Назад
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={nextStep}
                      disabled={currentStep === steps.length}
                      className="flex-1"
                    >
                      Вперед
                      <Icon name="ChevronRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;